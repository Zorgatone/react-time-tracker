import React from 'react';

export const Task = ({ label, duration }) => {
  const hours = Math.floor(duration / 3600000);
  if (hours > 0) { duration -= hours * 3600000; }
  const minutes = Math.floor(duration / 60000);
  if (minutes > 0) { duration -= minutes * 60000; }
  const seconds = Math.floor(duration / 1000)

  return (
    <li>
      {label}&nbsp;
      {hours.toString().padStart(2, '0')}:
      {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </li>
  );
};

export default Task;
