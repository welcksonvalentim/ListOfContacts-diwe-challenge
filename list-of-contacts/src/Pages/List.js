import React, { useEffect, useState } from 'react';
import { useListOfContacts } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { getAllList, deleteContact } from '../Utils/Functions';
import edit from '../Images/edit.svg';
import trash from '../Images/trash.svg';

function List() {
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState([]);
  const { setDataContact, token } = useListOfContacts();

  useEffect(() => {
    returnAllList(token);
    setLoading(false);
  }, [data, token]);

  const returnAllList = async (token) => {
    const returnAllList = await getAllList(token);
    setData(returnAllList);
    return returnAllList;
  }

  const handleClickEdit = async(contact) => {
    await setDataContact(contact);
    navigate('/editContact');
  }

  const handleClickDelete = async(numberId) => {
    await deleteContact(numberId, token);
    return;
  }

  const handleClickAddContact = () => {
    navigate('/addContact');
  }

  if (loading) return <h1>loading...</h1>;
  return (
    <main className='list'>
      <link href="http://fonts.cdnfonts.com/css/montserrat" rel="stylesheet"/>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'/>
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
      <Header />
      <section>
        <section className='list-name'>
          <h2>Listagem de contatos</h2>
          <button onClick={() => handleClickAddContact()}>Adicionar novo contato</button>
        </section>
        <section className='list-contact'>
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Nome</td>
                <td>Celular</td>
                <td>Email</td>
                <td>Ações</td>
              </tr>
            </thead> 
            <tbody>
              {data ? data.map((contact) => 
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.mobile}</td>
                  <td>{contact.email}</td>
                  <td>
                    <button onClick={() => handleClickEdit(contact)}>
                      <img alt="arrow left" src={edit}/>Editar
                    </button>
                    <button onClick={() => handleClickDelete(contact.id)}>
                      <img alt="arrow left" src={trash}/>Excluir
                    </button>
                  </td>
                </tr>) : []}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}

export default List;