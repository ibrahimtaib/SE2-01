/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import LoadingSpinner from '../components/LoadingSpinner';
import InsertForm from '../components/InsertForm';
import { useEffect } from 'react';

function InsertPage({user, loading, update, setLoading, proposalToInsert}) {

  useEffect(() => {
    console.log(update);
    if (loading) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (<LoadingSpinner />);
  }

  return (
    <InsertForm user={user} update={update} proposalToInsert={proposalToInsert} />
  )
}

export default InsertPage;