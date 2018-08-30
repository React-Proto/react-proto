const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#2196F3',
  '#009688',
  '#00BCD4',
  '#18FFFF',
  '#64FFDA',
  '#CDDC39',
  '#4CAF50',
  '#76FF03',
  '#C6FF00',
  '#FF9800',
  '#FF6D00',
  '#F50057',
  '#D500F9',
];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

export default getColor;
