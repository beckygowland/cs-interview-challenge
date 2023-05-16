import React from 'react';
import './CommitRow.css';

interface Props {
    url: string,
    author: string,
    date: moment.Moment,
    description: string
}

export default function CommitRow({ url, author, date, description }: Props) {
    return (
        <tr className='CommitRow'>
            <td className='DateColumn'><p>{date.format('MMMM D[,] YYYY [at] LT')}</p></td>
            <td><a href={url}>{description}</a></td>
            <td>{author}</td>
        </tr>
    );
}
