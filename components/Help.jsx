import { useEffect, useState } from "react"
import styles from "./Help.scss"

const Help = () => {
  const [isApple, setIsApple] = useState(false)
  const [keyW, setKeyW] = useState("w")
  const [keyA, setKeyA] = useState("a")
  const [keyS, setKeyS] = useState("s")
  const [keyD, setKeyD] = useState("d")
  const [keyZ, setKeyZ] = useState("z")
  const [keyX, setKeyX] = useState("x")
  const [keyC, setKeyC] = useState("c")
  const [keyV, setKeyV] = useState("v")

  async function getKeyboardKey(key, def) {
    if (typeof navigator !== "undefined" && navigator.keyboard !== undefined &&
        navigator.keyboard.getLayoutMap !== undefined) {
      let layoutMap = await navigator.keyboard.getLayoutMap()
      if (layoutMap !== undefined) {
        return layoutMap.get(key) || def
      }
    }
    return def
  }

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.platform !== undefined) {
      let p = navigator.platform.toLowerCase()
      if (p.indexOf("mac") >= 0 || p.indexOf("iphone") >= 0 || p.indexOf("ipad") >= 0) {
        setIsApple(true)
      }
    }

    async function getInternationalKeyboardKeys() {
      setKeyW(await getKeyboardKey("KeyW", "w"))
      setKeyA(await getKeyboardKey("KeyA", "a"))
      setKeyS(await getKeyboardKey("KeyS", "s"))
      setKeyD(await getKeyboardKey("KeyD", "d"))
      setKeyZ(await getKeyboardKey("KeyZ", "z"))
      setKeyX(await getKeyboardKey("KeyX", "x"))
      setKeyC(await getKeyboardKey("KeyC", "c"))
      setKeyV(await getKeyboardKey("KeyV", "v"))
    }

    getInternationalKeyboardKeys()
  }, [])

  let meta = isApple ? <>&#8984;</> : "Ctrl"
  let alt = isApple ? <>&#8997;</> : "Alt"
  let del = isApple ? <>&#9003;</> : "Delete"
  let shift = <>&#x21e7;</>

  return (<>
    <h2>Help</h2>

    <h3>Mouse</h3>
    <div className="shortcuts">
      <div className="key"><kbd>Click</kbd></div>
      <div className="desc">Select cell</div>

      <div className="key"><kbd>Click</kbd> + <kbd>Drag</kbd></div>
      <div className="desc">Select multiple cells</div>

      <div className="key"><kbd>{meta}</kbd> + <kbd>Click</kbd></div>
      <div className="desc">Add cell(s) to selection</div>

      <div className="key"><kbd>{meta}</kbd> + <kbd>{shift}</kbd> + <kbd>Click</kbd></div>
      <div className="desc">Deselect cell(s)</div>
    </div>

    <h3>Keyboard shortcuts</h3>
    <div className="shortcuts">
      <div className="key"><kbd>1</kbd> &ndash; <kbd>9</kbd></div>
      <div className="desc">Enter digit</div>

      <div className="key"><kbd>{shift}</kbd> + ( <kbd>1</kbd> &ndash; <kbd>9</kbd> )</div>
      <div className="desc">Enter corner mark</div>

      <div className="key"><kbd>{meta}</kbd> + ( <kbd>1</kbd> &ndash; <kbd>9</kbd> )</div>
      <div className="desc">Enter centre mark</div>

      <div className="key"><kbd>{alt}</kbd> + ( <kbd>1</kbd> &ndash; <kbd>9</kbd> )</div>
      <div className="desc">Colour selected cell(s)</div>

      <div className="key"><kbd>{del}</kbd></div>
      <div className="desc">Delete digit/mark/colour</div>

      <div className="divider"></div>

      <div className="key"><kbd>{meta}</kbd> + <kbd>Z</kbd></div>
      <div className="desc">Undo</div>

      <div className="key"><kbd>{meta}</kbd> + <kbd>{shift}</kbd> + <kbd>Z</kbd><br />
        <div className="alt-key"><kbd>{meta}</kbd> + <kbd>Y</kbd></div></div>
      <div className="desc">Redo</div>

      <div className="divider"></div>

      <div className="key"><kbd>Space</kbd></div>
      <div className="desc">Switch to next mode</div>

      <div className="key"><kbd>{keyZ.toUpperCase()}</kbd></div>
      <div className="desc">Digit mode</div>

      <div className="key"><kbd>{keyX.toUpperCase()}</kbd></div>
      <div className="desc">Corner mark mode</div>

      <div className="key"><kbd>{keyC.toUpperCase()}</kbd></div>
      <div className="desc">Centre mark mode</div>

      <div className="key"><kbd>{keyV.toUpperCase()}</kbd></div>
      <div className="desc">Colour mode</div>

      <div className="divider"></div>

      <div className="key"><kbd>{meta}</kbd> + <kbd>A</kbd></div>
      <div className="desc">Select all cells</div>

      <div className="key"><kbd>&#x2190;</kbd>, <kbd>&#x2191;</kbd>, <kbd>&#x2192;</kbd>, <kbd>&#x2193;</kbd><br />
        <div className="alt-key"><kbd>{keyW.toUpperCase()}</kbd>, <kbd>
          {keyA.toUpperCase()}</kbd>, <kbd>{keyS.toUpperCase()}</kbd>, <kbd>
          {keyD.toUpperCase()}</kbd></div></div>
      <div className="desc">Move selection</div>

      <div className="key"><kbd>{meta}</kbd> + ( <kbd>&#x2190;</kbd> &ndash; <kbd>&#x2193;</kbd> )<br />
        <div className="alt-key"><kbd>{meta}</kbd> + ( <kbd>
          {keyW.toUpperCase()}</kbd> &ndash; <kbd>{keyD.toUpperCase()}</kbd> )</div></div>
      <div className="desc">Add to selection</div>
    </div>
    <style jsx>{styles}</style>
  </>)
}

export default Help
