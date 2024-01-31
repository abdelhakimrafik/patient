import { useEffect, useState } from 'react';
import Icon from '../../../components/Icon';
import css from './Clock.style.module.scss';

export default function Clock(): React.JSX.Element {
  const [date, setDate] = useState<Date>(new Date());

  const animate = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(animate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.container}>
      <span className={css.date}>
        <Icon name="Calendar" color="#54BBCD" />
        {date.toLocaleString('fr-FR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
        })}
      </span>
      <span>
        <Icon name="Horloge" color="#54BBCD" />
        {date.toLocaleTimeString('fr-FR', { timeStyle: 'short' })}
      </span>
    </div>
  );
}
