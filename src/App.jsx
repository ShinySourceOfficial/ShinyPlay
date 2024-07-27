import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ idGame: '', name: '', status: false, company: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem({ ...item, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setItems(items.map(i => (i.idGame === item.idGame ? item : i)));
      setIsEditing(false);
      alert('Datos editados con éxito.');
    } else {
      if (items.some(i => i.idGame === item.idGame)) {
        alert('La ID ingresada ya existe. Intente con otra.');
        return;
      }
      setItems([...items, item]);
      alert('Juego añadido con éxito.');
    }
    setItem({ idGame: '', name: '', status: false, company: '' });
  };

  const editItem = (item) => {
    setItem(item);
    setIsEditing(true);
  };

  const deleteItem = (idGame) => {
    setItems(items.filter(i => i.idGame !== idGame));
    alert('Juego eliminado con éxito.');
  };

  return (
    <div className="container">
      <h1 className="mt-4">Lista de Juegos</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="idGame" className="pt-2">ID del Juego:</label>
          <input
            type="number"
            className="form-control"
            id="idGame"
            name="idGame"
            value={item.idGame}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="pt-2">Nombre del Juego:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group form-check pt-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="status"
            name="status"
            checked={item.status}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="status">¿Completado?</label>
        </div>
        <div className="form-group">
          <label htmlFor="company" className="pt-2">Compañia del Juego:</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={item.company}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">{isEditing ? 'Editar' : 'Agregar'}</button>
      </form>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Status</th>
            <th>Compañia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.idGame}>
              <td>{item.idGame}</td>
              <td>{item.name}</td>
              <td>{item.status ? 'Completado' : 'Sin Completar'}</td>
              <td>{item.company}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => editItem(item)}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteItem(item.idGame)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
