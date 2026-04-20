import { addDays, differenceInDays, getMonth, isBefore, isAfter, startOfDay } from 'date-fns';

/**
 * Calculates predictive metrics using Exponential Moving Average and Seasonal tracking.
 * @param {Array} records - Array of user inputted periods { start, end }
 */
export const calculateAverages = (records) => {
  if (!records || records.length === 0) return { cycleLength: 28, periodDuration: 5 };
  
  if (records.length === 1) {
    const duration = differenceInDays(new Date(records[0].end), new Date(records[0].start)) + 1;
    return { cycleLength: 28, periodDuration: Math.max(1, duration) };
  }

  // Calculate durations and cycle lengths
  const sorted = [...records].sort((a, b) => new Date(a.start) - new Date(b.start));
  let emaCycle = 28;
  let emaDuration = 5;
  const alpha = 0.5; // Smoothing factor for EMA

  for (let i = 0; i < sorted.length; i++) {
    const duration = differenceInDays(new Date(sorted[i].end), new Date(sorted[i].start)) + 1;
    emaDuration = (i === 0) ? duration : (alpha * duration) + ((1 - alpha) * emaDuration);
    
    if (i > 0) {
      const cycleLength = differenceInDays(new Date(sorted[i].start), new Date(sorted[i-1].start));
      if (cycleLength > 15 && cycleLength < 60) { // filter outliers
        emaCycle = (i === 1) ? cycleLength : (alpha * cycleLength) + ((1 - alpha) * emaCycle);
      }
    }
  }

  return { 
    cycleLength: Math.round(emaCycle), 
    periodDuration: Math.round(emaDuration) 
  };
};

/**
 * Applies Indian Season climate modifiers to the baseline predictive cycle length.
 * Summer/Heat shrinks cycle slightly, Monsoon stress elongates.
 */
const getSeasonModifier = (date) => {
  const month = getMonth(date); // 0-indexed (0 = Jan, 11 = Dec)
  if (month >= 2 && month <= 5) return -1;    // Summer (Mar-Jun)
  if (month >= 6 && month <= 8) return +1.5;  // Monsoon (Jul-Sep)
  return 0;                                   // Winter/Post-Monsoon (Oct-Feb)
};

export const predictNextPeriodInfo = (records) => {
  if (!records || records.length === 0) return null;
  
  const sorted = [...records].sort((a, b) => new Date(a.start) - new Date(b.start));
  const latestRecord = sorted[sorted.length - 1];
  const { cycleLength, periodDuration } = calculateAverages(records);

  const baselineStart = addDays(new Date(latestRecord.start), cycleLength);
  const seasonMod = getSeasonModifier(baselineStart);
  
  const adjustedCycleLength = cycleLength + Math.round(seasonMod);
  const nextStart = addDays(new Date(latestRecord.start), adjustedCycleLength);
  const nextEnd = addDays(nextStart, periodDuration - 1);
  const ovulation = addDays(nextStart, -14); // Average 14 days before next period
  
  return { nextStart, nextEnd, ovulation, adjustedCycleLength, periodDuration };
};

export const getDayInfo = (targetDate, records) => {
  const tDate = startOfDay(targetDate);
  const def = {
    phase: 'Unknown',
    colorClass: 'clay-card', // Default white/grey
    percentages: {},
    sentence: "Need more data to predict her mood properly!"
  };

  if (!records || records.length === 0) return def;

  // First, check if targetDate is amidst any RECORDED past period
  const sorted = [...records].sort((a, b) => new Date(a.start) - new Date(b.start));
  for (const rec of sorted) {
    if ((isAfter(tDate, startOfDay(new Date(rec.start))) || tDate.getTime() === startOfDay(new Date(rec.start)).getTime()) && 
        (isBefore(tDate, startOfDay(new Date(rec.end))) || tDate.getTime() === startOfDay(new Date(rec.end)).getTime())) {
      return {
        phase: 'Menstrual (Recorded)',
        colorClass: 'bg-pink',
        percentages: { Angry: 40, Sad: 30, Happy: 10, Horny: 5 },
        sentence: "She was on her period. Likely experiencing cramps and low energy."
      };
    }
  }

  // For future or current, simulate cycle starting from the latest record
  const latest = sorted[sorted.length - 1];
  const { cycleLength, periodDuration } = calculateAverages(records);
  let cycleStart = startOfDay(new Date(latest.start));
  
  // Fast forward to the cycle containing the targetDate
  while (isAfter(tDate, addDays(cycleStart, cycleLength + getSeasonModifier(cycleStart)))) {
    cycleStart = addDays(cycleStart, cycleLength + getSeasonModifier(cycleStart));
  }
  // Check if we went too far backwards (user clicked a date older than latest record but not within a record)
  if (isBefore(tDate, startOfDay(new Date(sorted[0].start)))) {
      return def;
  }

  const cycleMod = Math.round(getSeasonModifier(cycleStart));
  const currentLength = cycleLength + cycleMod;
  
  const dayOfCycle = differenceInDays(tDate, cycleStart);
  
  // Phase mapping
  const ovulationDay = currentLength - 14; 
  
  if (dayOfCycle >= 0 && dayOfCycle < periodDuration) {
    return {
      phase: 'Menstrual',
      colorClass: 'bg-pink clay-card',
      percentages: { Angry: 45, Sad: 35, Happy: 10, Horny: 5, Frustrated: 20 },
      sentence: "She might be experiencing cramps and low energy today. Give her some space and care!"
    };
  } else if (dayOfCycle < ovulationDay - 2) {
    return {
      phase: 'Follicular',
      colorClass: 'bg-mint clay-card', // Fixed to match index.css class
      percentages: { Happy: 60, Motivated: 30, Sad: 5, Horny: 15, Calm: 50 },
      sentence: "Her estrogen is rising! She's likely feeling motivated, energetic, and happy today."
    };
  } else if (dayOfCycle >= ovulationDay - 2 && dayOfCycle <= ovulationDay + 1) {
    return {
      phase: 'Ovulation',
      colorClass: 'bg-purple clay-card', // using purple/lavender for ovulation
      percentages: { Horny: 70, Caring: 20, Happy: 20, Angry: 5, Energetic: 60 },
      sentence: "She's in her most fertile window! Expect her to be very affectionate, happy, and possibly having a high libido today. She is very happy and cheerful today I think!"
    };
  } else {
    // Luteal Phase
    return {
      phase: 'Luteal',
      colorClass: 'bg-blue clay-card',
      percentages: { Angry: 55, Frustrated: 40, Sad: 25, Happy: 10, Moody: 60 },
      sentence: "PMS might be kicking in soon. She could be feeling frustrated or moody today, so be extra patient and caring."
    };
  }
};
