import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCommitsListUrl } from '../../Routes';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import './RepoForm.css'

export default function RepoForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [repo, setRepo] = useState('');

  const handleClick = () => {
    navigate(getCommitsListUrl(user, repo))
  };
  const isDisabled = !user || !repo

  return (
    <div className='RepoFormContainer'>
      <form className='RepoForm' onSubmit={handleClick} data-testid="form">
        <TextInput required placeholder='User/Org' value={user} onChange={(e) => setUser(e.target.value)} data-testid="user" />
        <TextInput required placeholder='Repo' value={repo} onChange={(e) => setRepo(e.target.value)} data-testid="repo" />
        <div className='RepoFormButtonContainer'>
          <Button type='submit' onClick={handleClick} disabled={isDisabled}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
