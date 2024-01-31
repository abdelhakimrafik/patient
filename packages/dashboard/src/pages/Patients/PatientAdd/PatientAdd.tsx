import { useForm } from 'react-hook-form';
import FolderPlus from '../../../assets/images/folderPlus';
import { InputWithFormHook as Input } from '../../../components/Input';
import { SelectWithFormHook as Select } from '../../../components/Select';
import Button from '../../../components/Button';
import css from './PatientAdd.style.module.scss';
import { useGetInsurancesQuery } from '../../../redux/api/insuranceApi';
import { useNavigate } from 'react-router-dom';
import { useCreateDocumentMutation } from '../../../redux/api/documentApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientAddSchema } from './PatientAdd.validation';
import { TypeOf } from 'zod';

const genderSelectData = [
  { name: 'Homme', value: 'h' },
  { name: 'Femme', value: 'f' },
];

export type TPatientAddFormData = TypeOf<typeof patientAddSchema>;

export default function PatientAdd(): React.JSX.Element {
  const navigate = useNavigate();
  const { data } = useGetInsurancesQuery();
  const { control, handleSubmit } = useForm<TPatientAddFormData>({
    mode: 'all',
    resolver: zodResolver(patientAddSchema),
  });
  const [createDocument] = useCreateDocumentMutation();

  const onSubmit = async (data: TPatientAddFormData) => {
    try {
      await createDocument({ patient: data }).unwrap();
      navigate('/');
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.title}>
        <FolderPlus />
        <h1>Nouveau dossier</h1>
      </div>
      <h1 className={css.sectionTitle}>Patient</h1>
      <div className={css.form}>
        <Input
          control={control}
          controllerName="cardId"
          label="CNE"
          placeholder="CNE de patient"
          required
        />
        <Input
          control={control}
          controllerName="firstName"
          label="Nom"
          placeholder="Nom de patient"
          required
        />
        <Input
          control={control}
          controllerName="lastName"
          label="Prénom"
          placeholder="Prénom de patient"
          required
        />
        <Select
          control={control}
          controllerName="gender"
          label="Sexe"
          items={genderSelectData}
          required
        />
        <Input
          control={control}
          controllerName="birthday"
          label="Date de naissance"
          placeholder="Date de naissance de patient"
          required
        />
        <Select
          control={control}
          controllerName="insurance"
          label="Couverture"
          items={data ? data.map((v) => ({ name: v.name, value: v.id })) : []}
          required
        />
        <Input
          control={control}
          controllerName="region"
          label="Région"
          placeholder="Région de patient"
          required
        />
        <Input
          control={control}
          controllerName="city"
          label="Ville"
          placeholder="Ville de patient"
          required
        />
        <Input
          control={control}
          controllerName="town"
          label="Commune"
          placeholder="Commune de patient"
          required
        />
        <Input
          control={control}
          controllerName="phone"
          label="Téléphone mobile"
          placeholder="Téléphone mobile de patient"
          required
        />
        <Input
          control={control}
          controllerName="address"
          label="Adresse"
          placeholder="Adresse de patient"
          required
          containerStyle={{ gridColumn: '3/5' }}
        />
        <Input
          control={control}
          controllerName="additionalAddress"
          label="Complément d'adresse"
          placeholder="Complément d'adresse de patient"
          required
          containerStyle={{ gridColumn: '1/5' }}
        />
      </div>
      <div className={css.footer}>
        <Button
          borderType="rounded"
          text="Annuler"
          backgroundColor="#858585"
          style={{ width: 150 }}
          onClick={() => navigate(-1)}
        />
        <Button
          borderType="rounded"
          text="Terminer"
          style={{ width: 150 }}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}
