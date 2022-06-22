import { FormRow, FormRowSelect, Alert } from '../components/index.js';
import { useAppContext } from '../context/appContext';
import styled from 'styled-components';

const AddIssue = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    description,
    department,
    issueLocation,
    issueType,
    issueTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createIssue,
    editIssue,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !department || !issueLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editIssue();
      return;
    }
    createIssue();
  };
  const handleIssueInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit issue' : 'add issue'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* description */}
          <FormRow
            type='text'
            name='description'
            value={description}
            handleChange={handleIssueInput}
          />
          {/* department */}
          <FormRow
            type='text'
            name='department'
            value={department}
            handleChange={handleIssueInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='issue location'
            name='issueLocation'
            value={issueLocation}
            handleChange={handleIssueInput}
          />
          {/* issue status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleIssueInput}
            list={statusOptions}
          />
          {/* issue type */}
          <FormRowSelect
            name='issueType'
            labelText='issue type'
            value={issueType}
            handleChange={handleIssueInput}
            list={issueTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default AddIssue;
