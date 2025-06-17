import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const generateId = (prefix, list) => {
  const nextIndex = list.length + 1;
  return `${prefix}${nextIndex.toString().padStart(5, '0')}`;
};

export const AdminPanel = () => {
  <div></div>
};
