import "./Translator.css"
import { useEffect, useState } from 'react'
import lang from "./languages"

// eslint-disable-next-line react/prop-types
function Translator({ setProgress }) {
    let [fromText, setFromText] = useState("");
    let [toText, setToText] = useState("");
    let [fromLanguage, setFromLanguage] = useState("en-GB");
    let [toLanguage, setToLanguage] = useState("hi-IN");
    let [languages, setLanguages] = useState({});
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLanguages(lang);
    }, []);

    let handleExchage = () => {
        let tempValue = fromText;
        setFromText(toText);
        setToText(tempValue);

        let tempLanguage = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(tempLanguage);
    }

    let copyContent = (text) => {
        navigator.clipboard.writeText(text);
    }

    let utterText = (text, language) => {
        let synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
    }

    let handleIconClock = (target, id) => {

        if (!fromText || !toText) return;

        if (target.classList.contains("fa-copy")) {
            if (id === 'from') {
                copyContent(fromText);
            } else {
                copyContent(toText);
            }
        } else {
            if (id === 'from') {
                utterText(fromText, fromLanguage);
            } else {
                utterText(toText, toLanguage);
            }
        }
    }
    let handleTranslate = () => {
        setProgress(30)
        setLoading(true);
        try {
            setProgress(70)
            // https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it
            let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setToText(data.responseData.translatedText)
                })
            setProgress(90)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
            setProgress(100)
        }
    }
    return (
        <>
            <div className="mainDivTranslator">
                <div className="mainTranslatorBody">
                    <section className='wrapper'>
                        <div className='text-input'>
                            <textarea className='form-text' name="from" id="from" placeholder="Enter text" value={fromText} onChange={(e) => setFromText(e.target.value)}></textarea>
                            <textarea className='to-text' name="to" id="from" readOnly value={toText} onChange={(e) => setToText(e.target.value)}></textarea>
                        </div>
                        <ul className='controls'>
                            <li className='row from'>
                                <div className="icons">
                                    <i id='from' className="fa-solid fa-volume-high" onClick={(event) => handleIconClock(event.target, 'from')}></i>
                                    <i id='from' className="fa-solid fa-copy" onClick={(event) => handleIconClock(event.target, 'from')}></i>
                                </div>
                                <select value={fromLanguage} onChange={(event) => setFromLanguage(event.target.value)}>
                                    {Object.entries(languages).map(([code, name]) => {
                                        return <option key={code} value={code}>{name}</option>
                                    })}
                                </select>
                            </li>
                            <li className='exchange' onClick={handleExchage}>
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                            </li>
                            <li className='row to'>
                                <div className="icons">
                                    <select value={toLanguage} onChange={(event) => setToLanguage(event.target.value)}>
                                        {Object.entries(languages).map(([code, name]) => {
                                            return <option key={code} value={code}>{name}</option>
                                        })}
                                    </select>
                                    <i id='to' className="fa-solid fa-copy" onClick={(event) => handleIconClock(event.target, 'to')}></i>
                                    <i id='to' className="fa-solid fa-volume-high" onClick={(event) => handleIconClock(event.target, 'to')}></i>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <button onClick={handleTranslate}>
                        {loading ? "Translating..." : "Translate Text"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Translator
