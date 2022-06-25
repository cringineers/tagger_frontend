import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { successNotification, errorNotification } from '../components/notification';
// react-select imports
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// axios
import axios from 'axios';

const animatedComponents = makeAnimated();

const Dashboard = () => {
    const [allTags, setAllTags] = useState([]);
    const [selectableTags, setSelectableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchType, setSearchType] = useState([]);

    // Load tags when dashboard loads
    useEffect(() => {
        const process_tags = (tags) => {
            return tags.map((item) => 
                item['tags'].map((tag, index) => {
                    if (!item['group']['binary'] || index === 1)
                        return {value: tag['id'], label: tag['name'], groupId: item['group']['id']}
                    else
                        return {}
                }).filter((tag) => (Object.keys(tag).length != 0))
            ).flat();
        }

		axios.get('/api/tag_groups')
			.then(res => {
                const tags = process_tags(res.data);
                setAllTags(tags);
                setSelectableTags(tags);
			})
			.catch(function (error) {
                errorNotification('Что-то пошло не так!');
                console.log(error.response);
			});
    }, []);

    // Load data on tag selector change
    useEffect(() => {
        // Make all tags selectable and return if no tags selected
        if (selectedTags.length === 0) {
            setSelectableTags(allTags);
            return;
        };
        // Disable tags from the same group
        let tagMask = new Array(allTags.length).fill(true);
        selectedTags.forEach(selectedTag => {
            tagMask = allTags.map((tag, index) =>
                !(((tag.groupId === selectedTag.groupId) && (tag.value != selectedTag.value)) || !tagMask[index])
            );
        });
        setSelectableTags(allTags.filter((item, i) => tagMask[i]));
        // Get matched images from database
        const tagstring = selectedTags.map(item => `tags=${item.value}`).join('&');
        axios.get(`/api/images/search?${tagstring}`, { params: {'page': 0, 'size': 40, 'type': searchType } })
			.then(res => {
                console.log(res);
			})
			.catch(function (error) {
                errorNotification('Что-то пошло не так!');
                console.log(error.response);
			});
    }, [selectedTags, searchType]);

    const handleLogout = e => {
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <a href="#" className="header-logo"><img src="logo.svg" alt="brand" /></a>

                <div className="header-search-type-selector">
                    <Select
                        defaultValue={{ value: 'any', label: 'Пересечение' }}
                        options={[
                            { value: 'any', label: 'Пересечение' },
                            { value: 'all', label: 'Объединение' }
                        ]}
                        onChange={setSearchType}
                    />
                </div>

                <div className="header-tag-selector">
                    <Select
                        placeholder='Выберите тег'
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={selectableTags}
                        onChange={setSelectedTags}
                    />
                </div>

                <div className="header-logout">
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
