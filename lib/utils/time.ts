export function calculateEndTime(startTime: string, duration: number) {
  // Parse the start time
  const [time, modifier] = startTime.split(/([APM]+)/i);
  let [hours, minutes] = time.split(/[:\-]/).map(Number);

  if (modifier.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  // Calculate end time in minutes
  const startMinutes: number = hours * 60 + minutes;
  const endMinutes: number = startMinutes + duration;

  // Convert end minutes back to hours and minutes
  const endHours: number = Math.floor(endMinutes / 60) % 24;
  const endMins: number = endMinutes % 60;

  // Format the end time
  const endModifier = endHours >= 12 ? 'PM' : 'AM';
  const adjustedEndHours = endHours % 12 || 12;
  const formattedEndMinutes = endMins.toString().padStart(2, '0');
  return `${adjustedEndHours}:${formattedEndMinutes}${endModifier}`;
}
