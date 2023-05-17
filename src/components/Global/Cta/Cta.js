import React from 'react';
import Button from '../Button/Button';

export default function Cta({ url, label, isButton = false, customVariant }) {
  return <Button isPrimary={isButton} url={url} label={label} customVariant={customVariant} />;
}
