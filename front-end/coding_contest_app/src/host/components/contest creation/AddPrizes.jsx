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
import {sendData, getData} from '../../apis/ApiRequests';

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
  const {formData: prizeData, handleInputChange, setFormData} = useFormHandler ({
    prizePosition: '',
    prizeDescription: '',
    prizeAmount: '',
    others: '',
  });

  useEffect (
    () => {
      const fetchPrizes = async () => {
        const url =
          BASE_SERVER_URL +
          HOST_ENDPOINT +
          CONTESTS +
          contestId +
          `/edit/prizes/${prizeId}`;
        const response = await getData (url);
        const data = response.data.data;
        if (data) {
          setFormData(
            {
              prizePosition: data[0].prize_position || '',
              prizeDescription: data[0].prize_description || '',
              prizeAmount: data[0].prize_amount || '',
              others: data[0].others || '',
            }
          )
          console.log ('prizes', data);
        }
      };
      fetchPrizes ();
    },
    [contestId]
  );

  const handlePrizeSubmit = async () => {
    const prizeFormData = new FormData ();
    prizeFormData.append ('prize_position', prizeData.prizePosition);
    prizeFormData.append ('prize_description', prizeData.prizeDescription);
    prizeFormData.append ('prize_amount', prizeData.prizeAmount);
    prizeFormData.append ('others', prizeData.others);
    prizeFormData.append ('contest', contestId);
    const url =
      BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + contestId + '/edit/prizes/';
    const response = await sendData (url, prizeFormData);
    if (response) {
      showSwalAlert ({
        icon: 'success',
        title: 'Prize added',
        text: 'Prizes details updated.',
      });
      navigate (`/administration/contests/${contestId}/edit/prizes`);
    }
  };

  return (
    <div>
      <div className="prize-contest">
        <div className="prize-contest-header">
          <h2 style={{fontWeight: 600}}>Add Prize</h2>
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
      <ContestEditFooter saveChanges={handlePrizeSubmit} />
    </div>
  );
}

export default AddPrizes;
