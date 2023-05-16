import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, getCommitsListUrl } from '../../Routes';

export default function RepoForm() {
  const navigate = useNavigate();
  const handleClick = () => navigate(getCommitsListUrl('m3db', 'm3'));

  return (
    <button type="button" onClick={handleClick}>
      Test nav
    </button>
  );
}
