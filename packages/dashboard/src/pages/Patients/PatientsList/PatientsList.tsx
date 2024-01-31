import { useRef, useState } from 'react';
import Button from '../../../components/Button';
import Grid from '../../../components/Grid';
import DataTable, { TColumns } from '../../../components/DataTable';
import Input from '../../../components/Input';
import { IDocument } from '../../../redux/api/types';
import { useGetDocumentsQuery } from '../../../redux/api/documentApi';
import SearchIcon from '../../../assets/images/search';
import css from './PatientsList.style.module.scss';

const columns: TColumns<IDocument>[] = [
  {
    name: "Date d'ouverture du dossier",
    key: 'createdAt',
    transform: (item) => new Date(item.createdAt).toLocaleDateString('fr-FR'),
  },
  { name: 'Nom', key: 'lastName' },
  { name: 'Prénom', key: 'firstName' },
  {
    name: 'Date de naissance',
    key: 'birthday',
    transform: (item) => new Date(item.birthday).toLocaleDateString('fr-FR'),
  },
  {
    name: 'Sexe',
    key: 'gender',
    transform: (item) => item.gender.toUpperCase(),
  },
  { name: 'N°CINE', key: 'cardId' },
  { name: 'Couverture', key: 'insurance' },
  {
    name: 'Dernière mise à jour',
    key: 'updatedAt',
    transform: (item) =>
      new Date(item.updatedAt).toLocaleString('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
  },
];

export default function PatientsList(): React.JSX.Element | null {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>();
  const { data, isLoading, isSuccess } = useGetDocumentsQuery({
    page: currentPage,
    pageSize: 2,
    keyword,
  });

  console.log('#>', data);

  const handleSearch = () => {
    const value = inputRef.current?.value;
    setKeyword(value);
  };

  if (isLoading) return null;

  return (
    <div className={css.container}>
      <Grid
        justify="space-between"
        align="center"
        style={{ marginBlockEnd: 20 }}
      >
        <div className={css.left}>
          <SearchIcon /> Recherche des patients
        </div>
        <Grid gap={15}>
          <Input
            ref={inputRef}
            placeholder="Recherche par (Nom, Prénom CINE..)"
            className={css.inputFilter}
          />
          <Button
            text="Filter"
            iconLeft="Filter"
            borderType="circle"
            className={css.filterBtn}
            onClick={() => handleSearch()}
          />
        </Grid>
        <Button
          text="Nouveau dossier"
          borderType="circle"
          iconLeft="UserPlus"
        />
      </Grid>
      {isSuccess ? (
        <DataTable
          values={data.data}
          columns={columns}
          emptyMessage="Aucune donnée à afficher"
          pagination={{ page: data.page, totalPage: data.totalPage }}
          onPageChange={(page) => setCurrentPage(page)}
          onRowClick={(item) => console.log(item)}
        />
      ) : null}
    </div>
  );
}
