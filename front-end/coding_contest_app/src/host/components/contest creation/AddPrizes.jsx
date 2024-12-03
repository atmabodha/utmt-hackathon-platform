import React from 'react';
import './AddPrizes.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import ContestEditFooter from './ContestEditFooter';
import {useFormHandler} from './FormHandlers';
import TextAreaField, {TextInputField} from '../../../utilities/FormComponents';
import {BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT} from '../../../Constants';
import {useParams, useNavigate} from 'react-router-dom';
import showSwalAlert from '../../../utilities/AlertComponents.jsx';
import {sendData, getData, putData} from '../../apis/ApiRequests';

function AddPrizes({contestUrl}) {
  const {contestId, prizeId} = useParams ();
  const navigate = useNavigate ();
  const textAreaFields = [
    {
      label: 'Prize Description',
      name: 'prizeDescription',
    },
    {
      label: 'Others',
      name: 'others',
    },
  ];

  const inputFields = [
    {
      label: 'Prize Position',
      name: 'prizePosition',
      type: 'text',
    },

    {
      label: 'Prize Amount',
      name: 'prizeAmount',
      type: 'number',
    },
  ];
  const {
    formData: prizeData,
    handleInputChange,
    setFormData,
  } = useFormHandler ({
    prizePosition: '',
    prizeDescription: '',
    prizeAmount: '',
    others: '',
  });

  useEffect (
    () => {
      const fetchPrizeDetails = async () => {
        if (prizeId) {
          const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}${CONTESTS}${contestId}/edit/prizes/${prizeId}/`;
          try {
            const response = await getData (url);
            const data = response.data.data;
            if (data) {
              setFormData ({
                prizePosition: data[0].prize_position || '',
                prizeDescription: data[0].prize_description || '',
                prizeAmount: data[0].prize_amount || '',
                others: data[0].others || '',
              });
            }
          } catch (error) {
            // showSwalAlert ({
            //   icon: 'error',
            //   title: 'Error',
            //   text: 'Failed to load prize details.',
            // });
          }
        }
      };
      fetchPrizeDetails ();
    },
    [contestId, prizeId]
  );

  const handlePrizeSubmit = async () => {
    const prizeFormData = new FormData ();
    prizeFormData.append ('prize_position', prizeData.prizePosition);
    prizeFormData.append ('prize_description', prizeData.prizeDescription);
    prizeFormData.append ('prize_amount', prizeData.prizeAmount);
    prizeFormData.append ('others', prizeData.others);
    prizeFormData.append ('contest', contestId);
    try {
      let response;
      if (prizeId) {
        // Update existing prize (PUT request)
        const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}${CONTESTS}${contestId}/edit/prizes/${prizeId}/edit/`;
        response = await putData (url, prizeFormData);
      } else {
        // Create new prize (POST request)
        const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}${CONTESTS}${contestId}/edit/prizes/`;
        response = await sendData (url, prizeFormData);
      }

      if (response) {
        showSwalAlert ({
          icon: 'success',
          title: prizeId ? 'Prize Updated' : 'Prize Added',
          text: prizeId
            ? 'Prize details updated successfully.'
            : 'Prize details added successfully.',
        });
        navigate (`/administration/contests/${contestId}/edit/prizes`);
      }
    } catch (error) {
      showSwalAlert ({
        icon: 'error',
        title: prizeId ? 'Update Failed' : 'Addition Failed',
        text: 'An error occurred while saving the prize details.',
      });
    }
  };

  return (
    <div>
      <div className="prize-contest">
        <div className="prize-contest-header">
          <h2 style={{fontWeight: 600}}>
            {prizeId ? 'Edit Prize' : 'Add Prize'}
          </h2>
          {' '}
          {/* Dynamic heading */}
          <Link
            to=""
            style={{textDecoration: 'none', color: 'var(--text-color)'}}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="prize-form">
          <Form>
            {inputFields.map ((field, index) => (
              <TextInputField
                key={index}
                type={field.type}
                label={field.label}
                name={field.name}
                value={prizeData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={'prize-input-field'}
                labelClass={'text-area-label'}
                controlClass={'text-area-control'}
              />
            ))}

            {textAreaFields.map ((field, index) => (
              <TextAreaField
                key={index}
                label={field.label}
                name={field.name}
                value={prizeData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={'prize-input-field'}
                labelClass={'text-area-label'}
                controlClass={'text-area-control'}
              />
            ))}
          </Form>
        </div>
      </div>
      <ContestEditFooter saveChanges={handlePrizeSubmit} previewLink={`/contests/${contestId}/details`}/>
    </div>
  );
}

export default AddPrizes;
