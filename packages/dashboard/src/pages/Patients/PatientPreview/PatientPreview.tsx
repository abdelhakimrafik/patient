import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useLazyGetPatientQuery } from '../../../redux/api/patientApi';
import Avatar from '../../../assets/images/avata';
import { getAge } from '../../../utils/dateUtils';
import Button from '../../../components/Button';
import css from './PatientPreview.style.module.scss';

const genders: Record<string, string> = {
  m: 'Homme',
  f: 'Femme',
};

export default function PatientPreview(): React.JSX.Element | null {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [getPatient, { data, isSuccess }] = useLazyGetPatientQuery();

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    getPatient({ id });
  }, [id, getPatient, navigate]);

  return isSuccess && data ? (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.headerLeft}>
          <Avatar className={css.avatar} />
          <div>
            <span
              className={css.patientName}
            >{`${data.firstName} ${data.lastName}`}</span>
            <span>
              Sexe <i>{genders[data.gender]}</i>
            </span>
          </div>
          <div>
            <span>
              Date de naissance
              <i>{new Date(data.birthday).toLocaleDateString('fr-FR')}</i>
            </span>
            <span>
              Age<i>{getAge(data.birthday)} ans</i>
            </span>
          </div>
        </div>
        <Button
          text="Réserver un rendez-vous"
          iconLeft="CalendarAlt"
          borderType="circle"
          backgroundColor="#50799E"
          className={css.headerBtn}
        />
        <Button
          text="Démarrer la consultation"
          iconLeft="Screen"
          borderType="circle"
          className={clsx(css.headerBtn, css.consultationBtn)}
        />
      </div>
      <div className={css.buttonBar}>
        <Button
          text="Fiche patient"
          color="#E1F4F7"
          backgroundColor="#1AA5C0"
        />
        <Button text="Antécédents" color="#1AA5C0" backgroundColor="#E1F4F7" />
        <Button text="Constantes" color="#1AA5C0" backgroundColor="#E1F4F7" />
        <Button text="Compte rendu" color="#1AA5C0" backgroundColor="#E1F4F7" />
      </div>
      <div className={css.sectionTitle}>
        <span>Patient</span>
        <Button
          text="Modifier"
          iconLeft="PencilAlt"
          borderType="circle"
          backgroundColor="#5E5E5E"
        />
      </div>
      <div className={css.content}>
        <div>
          <h1>CINE</h1>
          <p>{data.cardId}</p>
        </div>
        <div>
          <h1>Nom</h1>
          <p>{data.firstName}</p>
        </div>
        <div>
          <h1>Prénom</h1>
          <p>{data.lastName}</p>
        </div>
        <div>
          <h1>Sexe</h1>
          <p>{genders[data.gender]}</p>
        </div>
        <div>
          <h1>Date de naissance</h1>
          <p>{new Date(data.birthday).toLocaleDateString('fr-FR')}</p>
        </div>
        <div>
          <h1>Couverture</h1>
          <p>{data.insurance.name}</p>
        </div>
        <div>
          <h1>Région</h1>
          <p>Region</p>
        </div>
        <div>
          <h1>Ville</h1>
          <p>Ville</p>
        </div>
        <div style={{ gridColumn: '4/6' }}>
          <h1>Commune</h1>
          <p>Commun</p>
        </div>
        <div>
          <h1>Téléphone mobile</h1>
          <p>{data.phone}</p>
        </div>
        <div style={{ gridColumn: '2/4' }}>
          <h1>Adresse</h1>
          <p>{data.address}</p>
        </div>
        <div style={{ gridColumn: '4/6' }}>
          <h1>Complément d'adresse</h1>
          <p>{data.additionalAddress}</p>
        </div>
      </div>
    </div>
  ) : null;
}
