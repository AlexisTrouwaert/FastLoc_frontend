import Header from './Header'
import styles from '../styles/Profil.module.css'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiInput from '@mui/material/Input';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from '@mui/material';
import MyArticles from './MyArticles'
import Avis from'./Avis'

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function Profil() {
    // <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
    const formData = new FormData();

    const [show, setShow] = useState(false)

    const [date, setDate] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setprenom] = useState('')
    const [city, setCity] = useState('')
    const [adresse, setAdresse] = useState('')
    const [url, setUrl] = useState('')
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)

    const [categorie, setCategorie] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')

    const [etat, setEtat] = useState('')
    const [price, setPrice] = useState(0)
    const [locaduree, setLocaduree] = useState('')
    const [refresh, setRefresh] = useState(false)

    const [myArticles, setMyArticles] = useState()

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token

    let [noteLou, setNoteLou] = useState(0)
    let [noteLoc, setNoteLoc] = useState(0)
    const [avis, setAvis] = useState([])

    //Connexion persistante & recuperation all data user + Avis avec moyenne
    useEffect(() => {
        fetch(`http://localhost:3000/users/profil/${username}/${token}`)
            .then(response => response.json())
            .then(data => {
                setCity(data.data.addresse.city)
                setNom(data.data.name)
                setprenom(data.data.firstName)
                setDate(data.date)
                setAdresse(data.data.addresse.adresse)
                setUrl(data.data.url)
                setMyArticles([data.data.article])
            })
        fetch(`http://localhost:3000/avis/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            if (!data.result){
                setNote("Cet utilisateur n'as pas encore reçu de notes")
            } else {
                let j = 0
                let k = 0
                let noteL = 0
                let noteLo = 0
                for (let i of data.data){
                    if(i.Lou){
                        j++
                        noteL += i.Note
                    } else if (i.Loc){
                        k++
                        noteLo += i.Note
                    }
                    setNoteLou(noteL / j)
                    setNoteLoc(noteLo / k)
                    setAvis(data.data.reverse())
                    console.log(avis)
                }
            }
        })
    }, [refresh])

    const starsLou = [];
        for (let i = 0; i < 5; i++) {
            let style = {};
            if (i < noteLou) {
            style = { 'color': '#f1c40f' };
            }
            starsLou.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
        }

    const starsLoc = [];
    for (let i = 0; i < 5; i++) {
        let style = {};
        if (i < noteLoc) {
        style = { 'color': '#f1c40f' };
    }
    starsLoc.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
    }

    function reload(){
        setRefresh(!refresh)
    }

    
    const handleEdit = () => {
        setShow(!show)
        setEdit(!edit)
    }

    const handleCloseEdit = () => {
        setShow(!show)
        setEdit(!edit)
    }

    const handleCloseAdd = () => {
        setShow(!show)
        setAdd(!add)
    }

    //Edit du profil
    const handleApply = () => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`)
            .then(response => response.json())
            .then(data => {
                let latitude = data.features[0].geometry.coordinates[1]
                let longitude = data.features[0].geometry.coordinates[0]
                formData.append('file', file);
                formData.append('upload_preset', 'ob3welwd')
                fetch('https://api.cloudinary.com/v1_1/dtdjgn5ka/image/upload',
                    {
                        method: "POST",
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.url) {
                            setUrl(data.url)
                        }
                        fetch('http://localhost:3000/users/profil/edit', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                username: username,
                                token: token,
                                nom: nom,
                                prenom: prenom,
                                adresse: adresse,
                                city: city,
                                latitude: latitude,
                                longitude: longitude,
                                url: data.url
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.result) {
                                    setShow(!show)
                                    setEdit(!edit)
                                }
                            })
                    })
            })
    }

    const [filename, setFilename] = useState('')
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    };

    const [allTools, setAllTools] = useState([])

    //trie selecteur en fonction de la BDD
    const handleAdd = () => {
        setShow(!show)
        setAdd(!add)
        fetch('http://localhost:3000/tools/getTools')
        .then(response => response.json())
        .then(data => {
            if(data.result){
                setAllTools(data.data)
            }
        })
    }

    let filtrerCategories = []

    allTools.map((data) => {
        if(!filtrerCategories.includes(data.categorie)){
            filtrerCategories.push(data.categorie)
        }
    })

    let allCategories = filtrerCategories.map((data, i) => {
        return (<MenuItem value={data} key={i}>
            {data}
        </MenuItem>)
    })

    let filtrerBrand = []

    allTools.map((data) => {
        if(data.categorie === categorie){
            if(!filtrerBrand.includes(data.brand)){
                filtrerBrand.push(data.brand)
            }
        }
    })

    let allBrand = filtrerBrand.map((data, i) => {
        return (<MenuItem value={data} key={i}>
            {data}
        </MenuItem>)
    })

    let filtrerModel = []

    allTools.map((data) => {
        if(data.brand === brand && data.categorie === categorie){
            if(!filtrerModel.includes(data.model)){
                filtrerModel.push(data.model)
            }
        }
    })

    let allModel = filtrerModel.map((data, i) => {
        return (<MenuItem value={data} key={i}>
            {data}
        </MenuItem>)
    })

    const handleBlur = () => {
        if (price < 0) {
          setPrice(0);
        } else if (price > 50) {
          setPrice(50);
        }
      };

      const handleInputChange = (event) => {
        setPrice(event.target.value === '' ? 0 : Number(event.target.value));
    };

    let articleToAdd;

    const handleAddThis = () => {
            allTools.map((data) => {
                if(data.model === model && data.brand === brand && data.categorie === categorie){
                    articleToAdd = data._id
                }
            })
            fetch('http://localhost:3000/users/addArtcile',{
                method : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    username : username,
                    token : token,
                    urlPhoto : 'defaultOutil.jpg',
                    etat : etat,
                    price : price,
                    isAvailable : true,
                    outil : articleToAdd,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result){
                    setShow(!show)
                    setAdd(!add)
                    setRefresh(!refresh)
                }
            })
    }

    if(edit){
        modal = (<div className="App">
            <Modal show={show} onHide={handleCloseEdit} centered>
                <div className={styles.modaleAll}>
                    <div className={styles.modaleHeader}>
                        <p className={styles.p}>Editez votre profil</p>
                    </div>
                    <div>
                        <input type='file' accept="image/png" onChange={handleFileChange} className={styles.file}/>
                    </div>
                    <div className={styles.inputs}>
                        <input type='text' placeholder="Nom" onChange={e => setNom(e.target.value)} className={styles.inputUnit} value={nom}/>
                        <input type='text' placeholder="Prenom" onChange={e => setprenom(e.target.value)} className={styles.inputUnit} value={prenom} />
                        <input type='text' placeholder='Adresse' onChange={e => setAdresse(e.target.value)} className={styles.inputUnit} value={adresse} />
                        <input type='text' placeholder='Ville' onChange={e => setCity(e.target.value)} className={styles.inputUnit} value={city} />
                    </div>
                    <div>
                        <button onClick={() => handleApply()} className={styles.btnLogs}>Appliquer les modifications</button>
                    </div>
                </div>
            </Modal>
        </div>)
    } else if (add) {
        modal = (<div className='App'>
            <Modal show={show} onHide={handleCloseAdd} centered>
                <div>
                    <div>
                    <div>
                        <input type='file' accept="image/png" onChange={handleFileChange} className={styles.file}/>
                    </div>
                    </div>
                    <Box sx={{ maxWidth: 200, margin: 'auto', padding: 2 }}>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="categorie">Categorie</InputLabel>
                            <Select
                                labelId="city-label"
                                value={categorie}
                                label="Categorie"
                                onChange={(e) => setCategorie(e.target.value)}
                            >
                                {allCategories}
                                
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="2">Marque</InputLabel>
                            <Select
                                labelId="2-label"
                                value={brand}
                                label="Marque"
                                onChange={(e) => setBrand(e.target.value)}
                            >
                                {allBrand}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="3">Model</InputLabel>
                            <Select
                                labelId="3"
                                value={model}
                                label="Model"
                                onChange={(e) => setModel(e.target.value)}
                            >
                                {allModel}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="4">Etat</InputLabel>
                            <Select
                                labelId="4"
                                value={etat}
                                label="Etat"
                                onChange={(e) => setEtat(e.target.value)}
                            >
                                <MenuItem value={'Comme neuf'}>
                                    Comme neuf
                                </MenuItem>
                                <MenuItem value={'Bon etat'}>
                                    Bon etat
                                </MenuItem>
                                <MenuItem value={'Etat moyen'}>
                                    Etat moyen
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <div>
                            <p>Price</p>
                            <Input
                                className={styles.input}
                                value={price}
                                size="medium"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    max: 50,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </div>
                    </Box>
                    <button onClick={() => handleAddThis()}>Confirmer</button>
                </div>
            </Modal>
        </div>)
    }

    let modal;

    const [search, setSearch] = useState('')

    return (
        <div className={styles.all}>
            {modal}
            <div className={styles.divHeader}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.up}>
                    <div className={styles.tileInfos}>
                        <div className={styles.headerInfos}>
                            <img src={url} alt='Photo de profil' className={styles.Pp} />
                            <div>
                                <p className={styles.pName}>{prenom}</p>
                                <p className={styles.pNameF}>{nom}</p>
                            </div>
                        </div>
                        <div className={styles.middleInfos}>
                            <p className={styles.p}>Ville : {city}</p>
                            <p className={styles.p}>Membre depuis le : {date}</p>
                            <p className={styles.p}>Temps de réponse moyen : 30min</p>
                        </div>
                        <div className={styles.divNote}>
                            <div>
                                <p className={styles.p}>Note loueur : {noteLou}</p>
                                {starsLou}
                            </div>
                            <div>
                                <p className={styles.p}>Note locataire : {noteLoc}</p>
                                {starsLoc}
                            </div>
                            <button className={styles.edit} onClick={() => handleEdit()}>Éditer mon profil</button>
                        </div>
                    </div>
                    <div className={styles.avisAndSearch}>
                        <div className={styles.avis}>
                            <Avis info={avis}/>
                        </div>
                        <div className={styles.divSearch}>
                            <input type='text' placeholder='Recherchez parmis vos articles en location' className={styles.searchB} onChange={e => setSearch(e.target.value)}/>
                            <button
                                className={styles.btnSearch}
                                onClick={() => handleSearch()}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.divtools}>
                    <div className={styles.innerTool}>
                        <div className={styles.divAddArticle} onClick={() => handleAdd()}>
                            <div className={styles.divPlus}>
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#FEBD59" }} className={styles.plus} />
                            </div>
                            <p className={styles.add}>Ajouter un article</p>
                        </div>
                        <MyArticles outildata={myArticles} functionR={reload} username={username} token={token} search={search}/>
                    </div>
                </div>
            </div>
        </div>
    )
}