import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [page, setPage] = useState(1);
    const [meals, setMeals] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState({});

    const fetchAllMeals = async () => {
        try {
            const response = await axios.get(`/meal/get-meal/${page}`,{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            });
            setMeals(response.data.meals);
            setFilteredMeals(response.data.meals);
            toast.success('Meals fetched successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
        } catch (error) {
            toast.error(`${error.response.data.message}`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        fetchAllMeals();
    }, [page]);

    const handleFilterChange = (filter) => {
        let newFilters = [...filters];
        if (newFilters.includes(filter)) {
            newFilters = newFilters.filter((item) => item !== filter);
        } else {
            newFilters.push(filter);
        }
        setFilters(newFilters);

        if (newFilters.length === 0) {
            setFilteredMeals(meals);
        } else {
            const filtered = meals.filter((meal) =>
                newFilters.every((filter) => meal.labels.some((label) => label.label === filter))
            );
            setFilteredMeals(filtered);
        }
    };

    const handleSelectMeal = (meal) => {
        setSelectedMeals((prevSelectedMeals) => {
            const newSelectedMeals = { ...prevSelectedMeals };
            if (newSelectedMeals[meal.id]) {
                newSelectedMeals[meal.id].count += 1;
            } else {
                newSelectedMeals[meal.id] = { ...meal, count: 1 };
            }
            toast.success(`Selected ${meal.title}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            return newSelectedMeals;
        });
    };

    const handleBuy = () => {
        if (Object.keys(selectedMeals).length > 0) {
            let total = 0;
            Object.values(selectedMeals).forEach((meal) => {
                total += meal.price * meal.count;
            })
            toast.success(`You have bought the selected meals for €${total}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            setSelectedMeals({});
        } else {
            toast.error('Please select a meal first!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
        }
    };

    return (
        <main className='main-container'>
            <div style={{ width: "60%" }}>
                <div>
                    <div className='filter-checkboxes d-flex justify-content-evenly'>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Pork" className="filter_meal" onClick={() => handleFilterChange("Pork")} />
                            <label htmlFor="Pork">Pork</label>
                        </div>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Seafood" className="filter_meal" onClick={() => handleFilterChange("Seafood")} />
                            <label htmlFor="Seafood">Seafood</label>
                        </div>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Chicken" className="filter_meal" onClick={() => handleFilterChange("Chicken")} />
                            <label htmlFor="Chicken">Chicken</label>
                        </div>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Beef" className="filter_meal" onClick={() => handleFilterChange("Beef")} />
                            <label htmlFor="Beef">Beef</label>
                        </div>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Vegetarian" className="filter_meal" onClick={() => handleFilterChange("Vegetarian")} />
                            <label htmlFor="Vegetarian">Vegetarian</label>
                        </div>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Kids" className="filter_meal" onClick={() => handleFilterChange("Kids")} />
                            <label htmlFor="Kids">Kids</label>
                        </div>
                        <div className="checkbox-button">
                            <input type="checkbox" id="Breakfast" className="filter_meal" onClick={() => handleFilterChange("Breakfast")} />
                            <label htmlFor="Breakfast">Breakfast</label>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='meals-container'>
                    {filteredMeals.map((meal) => (
                        <div className='meal-card' key={meal.id}>
                            <img src={meal.img} alt={meal.title} className='meal-image' />
                            <div className='meal-info'>
                                <h3>{meal.title}</h3>
                                <p>Starter: {meal.starter}</p>
                                <p>Desert: {meal.desert}</p>
                                <p>Selected drink: {meal.drink}</p>
                                <p>Price: {meal.price}€</p>
                                <button className='select-button' onClick={() => handleSelectMeal(meal)}>Select</button>
                            </div>
                        </div>
                    ))}
                    <div className='pagination'>
                        {[...Array(3)].map((_, index) => (
                            <button key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ width: "40%", padding: '20px' }}>
                <h2>Selected Meals</h2>
                <div className='selected-meals'>
                    {Object.values(selectedMeals).map((meal) => (
                        <div key={meal.id} className='selected-meal'>
                            <p>{meal.title} x {meal.count}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleBuy} className='buy-button'>Buy</button>
            </div>
        </main>
    );
}

export default Home;