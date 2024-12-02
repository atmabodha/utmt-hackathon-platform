import React, {useEffect, useState} from 'react';
import './prizes.css';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {HOST_ENDPOINT, BASE_SERVER_URL, CONTESTS} from '../../../Constants';
import {getData, deleteData} from '../../apis/ApiRequests';
import {useNavigate} from 'react-router-dom';
import showSwalAlert from '../../../utilities/AlertComponents.jsx';
import Swal from 'sweetalert2';

const Prizes = ({contestUrl}) => {
  const {contestId} = useParams ();
  const navigate = useNavigate ();
  const [prizes, setPrizes] = useState ([]);

  useEffect (
    () => {
      const fetchPrizes = async () => {
        const url =
          BASE_SERVER_URL +
          HOST_ENDPOINT +
          CONTESTS +
          contestId +
          '/edit/prizes/';
        const response = await getData (url);
        const data = response.data.data;
        if (data) {
          setPrizes (data);
          console.log ('prizes', data);
        }
      };
      fetchPrizes ();
    },
    [contestId]
  );

  // const handleDeletePrize = async prizeId => {
  //   const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}${CONTESTS}${contestId}/prizes/${prizeId}/delete/`;
  //   try {
  //     const response = await deleteData (url);
  //     if (response && response.status === 200) {
  //       setPrizes (prizes.filter (prize => prize.prize_id !== prizeId));
  //       showSwalAlert ({
  //         icon: 'success',
  //         title: 'Prize Deleted',
  //         text: 'Prizes details deleted successfully',
  //       });
  //     }
  //   } catch (error) {
  //     showSwalAlert ({
  //       icon: 'error',
  //       title: 'Unable to delete',
  //       text: 'Failed to delete the prize details',
  //     });
  //   }
  // };
  const handleDeletePrize = async prizeId => {
    Swal.fire ({
      title: 'Are you sure?',
      text: 'This action will permanently delete the prize!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then (async result => {
      if (result.isConfirmed) {
        try {
          const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}${CONTESTS}${contestId}/prizes/${prizeId}/delete/`;
          const response = await deleteData (url);

          if (response && response.status === 200) {
            setPrizes (prizes.filter (prize => prize.prize_id !== prizeId));

            Swal.fire ({
              icon: 'success',
              title: 'Prize Deleted',
              text: 'Prize details deleted successfully',
            });
          }
        } catch (error) {
          // console.error ('Error deleting prize:', error);
          // Swal.fire ({
          //   icon: 'error',
          //   title: 'Unable to delete',
          //   text: 'Failed to delete the prize details',
          // });
        }
      }
    });
  };

  const handleAddPrize = () => {
    navigate (`/administration/contests/${contestId}/edit/prizes/create`);
  };

  const handleEditPrize = prizeId => {
    navigate (
      `/administration/contests/${contestId}/edit/prizes/${prizeId}/edit`
    );
  };

  return (
    <div className="prizes-list">
      <div className="prizes-list-header">
        <h2 style={{fontWeight: 600}}>Prizes</h2>
        <Link
          to=""
          style={{textDecoration: 'none', color: 'var(--text-color)'}}
        >
          {contestUrl}www.codehut.com/hackHard
        </Link>
      </div>
      <div className="table-container">
        <div className="table-header">
          <button className="add-btn" onClick={handleAddPrize}>
            Add Prizes
          </button>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Others</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prizes.map ((prize, index) => (
              <tr key={index}>
                <td>{prize.prize_position}</td>
                <td>{prize.prize_description}</td>
                <td>{prize.prize_amount}</td>
                <td>{prize.others}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditPrize (prize.prize_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePrize (prize.prize_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prizes;
