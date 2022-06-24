import React from "react";
import {View, Text, Button,StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Expo  from "expo";
import { Scene, MeshStandardMaterial, PointLight,  Mesh, MeshBasicMaterial ,PerspectiveCamera, BoxBufferGeometry, Color  } from "three";
import ExpoTHREE,{Renderer} from 'expo-three';
import { ExpoWebGLRenderingContext,GLView } from "expo-gl";
//import {GTLFLoader} from './threeJs_master/examples/jsm/loaders/GLTFLoader'
//import * as THREE from 'three'



let my_counter;
export default class App extends React.Component {

  constructor () {
    super();
    this.state = { counter: 1}
  }

  onIncrement = () => {
    this.setState({
      counter: this.state.counter + 0.1,
    })
    my_counter= this.state.counter
    // alert("Hello World");
  };
  
  render () {
    const counter = this.state.counter;
    let shape;
    if (counter <= 5) {
      shape = <Cube/>
    }

    // switch (counter) {
    //   case (counter > 5):
    //     shape = <Sphere/>;
    //     break;
    //   case (counter > 10):
    //     shape = <Cone/>;
    //     break;
    //   default:
    //     shape = <Cube/>;
    // }

    return (
      <View style={styles.container}>
        { shape }
        <Text>Counter: { counter }</Text>
        <StatusBar style="auto" />
        <View>
          <Button
            title='Click me'
            color='#f194ff'
            backgroundColor='red'
            onPress={this.onIncrement}
          />
        </View>
      </View>
    );
  }
}


const Cube = () => {
  const onContextCreate = (gl) => {
    // threejs code
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, gl.drawingBufferWidth/gl.drawingBufferHeight, 0.1, 1000);

    gl.canvas = {width: gl.drawingBufferWidth, height: gl.drawingBufferHeight};
    camera.position.z = 2;

    const renderer = new Renderer({gl});
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    
    const geometry = new BoxBufferGeometry(1,1,1);
    const material = new MeshStandardMaterial({color: 'blue'});
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.set(5,5,5);
    scene.add(pointLight);
   
   

    const render = ()=>{
      requestAnimationFrame(render)

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.scale.set(my_counter,my_counter,my_counter)
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }

    render();
  } 

  return (
    <GLView
      onContextCreate = {onContextCreate}
      style = {styles.cube}
    />
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cube: {
    width: 500,
    height: 500,
  }
});