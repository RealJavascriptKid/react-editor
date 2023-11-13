import React from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { Delete } from "baseui/icon"
import { throttle } from "lodash"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { ANIMATIONS } from "~/constants/design-editor"
import Outline from "./Common/Outline"
import Shadow from "./Common/Shadow"

const ANIMATIONS_LIST = {
  None: {
    animation: {
     type:'none',
     speed:0
    },
  },
  Rise: {
    animation: {
      type:'rise',
      speed:15
     },
  },
}
const Animations = () => {
  const [color, setColor] = React.useState("#b32aa9")
  const activeObject = useActiveObject()
  const editor = useEditor()

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color })
    }

    setColor(color)
  }, 100)

  const applyAnimation = (name: string) => {
    if (editor) {
      //  @ts-ignore
      const animation = ANIMATIONS_LIST[name]
      if (animation) {
        //  @ts-ignore
        window.edr = editor; console.warn("remove this in production")
        editor.objects.update(animation)
      }
    }
  }
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Animations</Block>

        <Block $style={{ cursor: "pointer", display: "flex" }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <Block $style={{ display: "grid", gridTemplateColumns: "80px 80px 80px", gap: "0.5rem" }}>
            {ANIMATIONS.map((animation, index) => {
              return (
                <Block style={{ cursor: "pointer" }} key={index}>
                  <Block
                    onClick={() => applyAnimation(animation.name)}
                    $style={{
                      border: "1px solid #afafaf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px",
                    }}
                  >
                    <img style={{ width: "70px" }} src={animation.preview} />
                  </Block>
                  <Block
                    $style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      fontSize: "14px",
                    }}
                  >
                    {animation.name}
                  </Block>
                </Block>
              )
            })}
          </Block>
          {/* <Block>
            <Outline />
            <Shadow />
          </Block> */}
        </Block>
      </Scrollable>
    </Block>
  )
}

export default Animations
