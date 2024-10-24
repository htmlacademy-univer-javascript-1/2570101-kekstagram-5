/* eslint-disable no-console */
/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

const checkDurationOfMeeting = (startWorkingDay, endWorkingDay, startMeeting, durationMeeting) => {
  const startTimeOfWorkingDay = startWorkingDay.split(':');
  const startWorkingDayHours = Number(startTimeOfWorkingDay[0]);
  const startWorkingDayMin = Number(startTimeOfWorkingDay[1]);

  const endTimeOfWorkingDay = endWorkingDay.split(':');
  const endWorkingDayHours = Number(endTimeOfWorkingDay[0]);
  const endWorkingDayMin = Number(endTimeOfWorkingDay[1]);

  const startTimeOfMeeting = startMeeting.split(':');
  const startMeetingHours = Number(startTimeOfMeeting[0]);
  const startMeetingMin = Number(startTimeOfMeeting[1]);

  const durationMeetingHours = Math.floor(durationMeeting / 60);
  const durationMeetingMin = durationMeeting - (durationMeetingHours * 60);

  if (startWorkingDayHours > startMeetingHours || (startMeetingHours === startWorkingDayHours && startMeetingMin < startWorkingDayMin)) {
    return false;
  }

  let endMeetingHours = durationMeetingHours + startMeetingHours;
  let endMeetingMin = durationMeetingMin + startMeetingMin;

  if (endMeetingMin >= 60) {
    endMeetingHours += 1;
    endMeetingMin -= 60;
  }

  if (endMeetingHours > endWorkingDayHours || (endMeetingHours === endWorkingDayHours && endMeetingMin > endWorkingDayMin)) {
    return false;
  } return true;

};


console.log(checkDurationOfMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(checkDurationOfMeeting('8:0', '10:0', '8:0', 120)); // true
console.log(checkDurationOfMeeting('08:00', '14:30', '14:00', 90)); // false
console.log(checkDurationOfMeeting('14:00', '17:30', '08:0', 90)); // false
console.log(checkDurationOfMeeting('8:00', '17:30', '08:00', 900)); // false
