/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import InsertForm from '../components/InsertForm';
import LoadingSpinner from '../components/LoadingSpinner';

function InsertPage({user, loading, update, setLoading, proposalToInsert, refetchDynamicContent}) {

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
    <InsertForm user={user} update={update} proposalToInsert={proposalToInsert} refetchDynamicContent={refetchDynamicContent} />
  )
}

export default InsertPage;