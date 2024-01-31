import Button from '../../../components/Button';
import Grid from '../../../components/Grid';
import DataTable from '../../../components/DataTable';
import Input from '../../../components/Input';
import css from './PatientsList.style.module.scss';

const data = [
  {
    cin: 'PA2584',
    firstname: 'Abdelhakim',
    lastname: 'Rafik',
    birthDay: '01/01/1996',
    gender: 'M',
    insurance: 'CNSS',
  },
  {
    cin: 'PA2584',
    firstname: 'Abdelhakim',
    lastname: 'Rafik',
    birthDay: '01/01/1996',
    gender: 'M',
    insurance: 'CNSS',
  },
  {
    cin: 'PA2584',
    firstname: 'Abdelhakim',
    lastname: 'Rafik',
    birthDay: '01/01/1996',
    gender: 'M',
    insurance: 'CNSS',
  },
  {
    cin: 'PA2584',
    firstname: 'Abdelhakim',
    lastname: 'Rafik',
    birthDay: '01/01/1996',
    gender: 'M',
    insurance: 'CNSS',
  },
];

const columns = ['CIN', 'Nom', 'Prenom', 'Date naissance', 'Sex', 'Coverture'];

export default function PatientsList(): React.JSX.Element {
  return (
    <div className={css.container}>
      <Grid
        justify="space-between"
        align="center"
        style={{ marginBlockEnd: 20 }}
      >
        <div>Recherche des patients</div>
        <Grid gap={15}>
          <Input
            placeholder="Recherche par (Nom, Prénom CINE..)"
            className={css.inputFilter}
          />
          <Button
            text="Filter"
            iconLeft="Filter"
            borderType="circle"
            className={css.filterBtn}
          />
        </Grid>
        <Button
          text="Nouveau dossier"
          borderType="circle"
          iconLeft="UserPlus"
        />
      </Grid>
      <DataTable
        values={data}
        columns={columns}
        pagination={{ page: 5, total: 6 }}
      />
    </div>
  );
}
