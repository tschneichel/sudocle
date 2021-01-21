import Palette from "./Palette"
import RadioGroup from "./RadioGroup"
import RangeSlider from "./RangeSlider"
import SettingsContext from "./contexts/SettingsContext"
import { useContext, useEffect, useRef, useState } from "react"
import styles from "./Settings.scss"

const Settings = () => {
  const settings = useContext(SettingsContext.State)
  const updateSettings = useContext(SettingsContext.Dispatch)
  const [themeInternal, setThemeInternal] = useState(settings.theme)

  const refPlaceholderExtended = useRef()
  const refPlaceholderCTC = useRef()
  const refPlaceholderWong = useRef()

  const [coloursDefault, setColoursDefault] = useState([])
  const [coloursExtended, setColoursExtended] = useState([])
  const [coloursCTC, setColoursCTC] = useState([])
  const [coloursWong, setColoursWong] = useState([])
  const [coloursCustom, setColoursCustom] = useState(settings.customColours)

  function onChangeTheme(theme) {
    setThemeInternal(theme)
    setTimeout(() => {
      updateSettings({ theme })
    }, 100)
  }

  const changeZoomTimeout = useRef()
  function onChangeZoom(value) {
    if (changeZoomTimeout.current !== undefined) {
      clearTimeout(changeZoomTimeout.current)
    }
    changeZoomTimeout.current = setTimeout(() => {
      updateSettings({ zoom: value })
    }, 200)
  }

  function zoomValueToDescription(value) {
    if (value === 1) {
      return "Default"
    }
    return `x${value}`
  }

  function onChangeFontSizeDigits(value) {
    updateSettings({ fontSizeFactorDigits: value })
  }

  function onChangeFontSizeCornerMarks(value) {
    updateSettings({ fontSizeFactorCornerMarks: value })
  }

  function onChangeFontSizeCentreMarks(value) {
    updateSettings({ fontSizeFactorCentreMarks: value })
  }

  function fontSizeValueToDescription(value) {
    if (value === 0.75) {
      return "Tiny"
    } else if (value === 0.875) {
      return "Small"
    } else if (value === 1) {
      return "Normal"
    } else if (value === 1.125) {
      return "Large"
    } else if (value === 1.25) {
      return "X-Large"
    } else if (value === 1.375) {
      return "XX-Large"
    } else if (value === 1.5) {
      return "Maximum"
    }
    return undefined
  }

  function onUpdateCustomColours(colours) {
    setColoursCustom(colours)
    updateSettings({ customColours: colours })
  }

  useEffect(() => {
    setThemeInternal(settings.theme)
  }, [settings.theme])

  useEffect(() => {
    function makeColours(elem) {
      let style = getComputedStyle(elem)
      let nColours = +style.getPropertyValue("--colors")
      let result = []
      for (let i = 0; i < nColours; ++i) {
        let pos = +style.getPropertyValue(`--color-${i + 1}-pos`)
        result[pos - 1] = style.getPropertyValue(`--color-${i + 1}`)
      }
      return result
    }

    let defaultColours = makeColours(document.body)
    setColoursDefault(defaultColours)
    setColoursExtended(makeColours(refPlaceholderExtended.current))
    setColoursCTC(makeColours(refPlaceholderCTC.current))
    setColoursWong(makeColours(refPlaceholderWong.current))
    setColoursCustom(old => old.length === 0 ? defaultColours : old)
  }, [])

  return (<>
    <h2>Settings</h2>

    <h3>Theme</h3>
    <RadioGroup name="theme" value={themeInternal} options={[{
      id: "default",
      label: "Modern"
    }, {
      id: "ctc",
      label: "Cracking the Cryptic"
    }, {
      id: "dark",
      label: "Dark"
    }]} onChange={onChangeTheme} />

    <h3>Colour Palette</h3>
    <div className="palette-placeholder" data-colour-palette="extended" ref={refPlaceholderExtended} />
    <div className="palette-placeholder" data-colour-palette="ctc" ref={refPlaceholderCTC} />
    <div className="palette-placeholder" data-colour-palette="wong" ref={refPlaceholderWong} />
    <RadioGroup name="colourPalette" value={settings.colourPalette} options={[{
      id: "default",
      label: <div className="palette-label"><div>Modern</div>
        <Palette colours={coloursDefault} /></div>
    }, {
      id: "extended",
      label: <div className="palette-label"><div>Modern (extended)</div>
        <Palette colours={coloursExtended} /></div>
    }, {
      id: "ctc",
      label: <div className="palette-label"><div>Cracking the Cryptic</div>
        <Palette colours={coloursCTC} /></div>
    }, {
      id: "wong",
      label: <div className="palette-label"><div>Wong (optimised for colour-blindness)</div>
        <Palette colours={coloursWong} /></div>
    }, {
      id: "custom",
      label: <div className="palette-label"><div>Custom</div>
        <Palette colours={coloursCustom} customisable={true}
        updatePalette={onUpdateCustomColours} /></div>
    }]} onChange={(colourPalette) => updateSettings({ colourPalette })} />

    <h3>Zoom</h3>
    <div className="slider">
      <RangeSlider id="range-zoom"
        min="0.9" max="1.25" step="0.05" value={settings.zoom}
        onChange={onChangeZoom}
        valueToDescription={zoomValueToDescription} />
    </div>

    <h3>Font sizes</h3>
    <div className="slider">
      <RangeSlider id="range-digits" label="Digits"
        min="0.75" max="1.5" step="0.125" value={settings.fontSizeFactorDigits}
        onChange={onChangeFontSizeDigits}
        valueToDescription={fontSizeValueToDescription} />
    </div>
    <div className="slider">
      <RangeSlider id="range-corner-marks" label="Corner marks"
        min="0.75" max="1.5" step="0.125" value={settings.fontSizeFactorCornerMarks}
        onChange={onChangeFontSizeCornerMarks}
        valueToDescription={fontSizeValueToDescription} />
    </div>
    <div className="slider">
      <RangeSlider id="range-centre-marks" label="Centre marks"
        min="0.75" max="1.5" step="0.125" value={settings.fontSizeFactorCentreMarks}
        onChange={onChangeFontSizeCentreMarks}
        valueToDescription={fontSizeValueToDescription} />
    </div>

    <style jsx>{styles}</style>
  </>)
}

export default Settings
