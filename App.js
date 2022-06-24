import React from "react";
import {View, Text, Button} from 'react-native'

import Expo  from "expo";
import {  Mesh, MeshBasicMaterial ,PerspectiveCamera, BoxBufferGeometry, Color, Scene  } from "three";
import ExpoTHREE,{Renderer} from 'expo-three';
import { ExpoWebGLRenderingContext,GLView } from "expo-gl";
//import {GTLFLoader} from './threeJs_master/examples/jsm/loaders/GLTFLoader'
//import * as THREE from 'three'
const App=() => { 

  

  const onContextCreate=async (gl)=>{
    //THREEJS CODE
    const scene= new Scene() 
    const camera= new PerspectiveCamera(75,gl.drawingBufferWidth/gl.drawingBufferHeight,0.1,1000)
    gl.canvas={width:gl.drawingBufferWidth,height:gl.drawingBufferHeight}
    camera.position.z=2
    const renderer=new Renderer({gl})
    renderer.setSize(gl.drawingBufferWidth,gl.drawingBufferHeight)
    
    const geometry=new BoxBufferGeometry(1,1,1)
    const material= new MeshBasicMaterial({color:'green'})
    const cube=new Mesh(geometry,material)

    scene.add(cube)

    
//event listener
let counter=1
let factor
const afterClick= () =>{
  counter+=0.01
  factor=counter
  cube.scale.set(factor,factor,factor)
  //sleep(1000)

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
   const render=() =>{

      requestAnimationFrame(render)
      cube.rotation.x +=0.01
      cube.rotation.y +=0.01

      renderer.render(scene,camera)
      gl.endFrameEXP()
    } 
    render()

  }
  return (
    <View>
    
    <GLView
          onContextCreate={onContextCreate}
          style={{width:500,height:500}}
    />
    <View>

<Text> hello world</Text>
<Button title="GROW" onPress= {this.onContafterClick} ></Button>
    </View>   
    </View>     
  )

}
export default App