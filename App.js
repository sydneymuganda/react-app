import React from "react";
import {View, Text, Button,StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Expo  from "expo";
import { Scene, MeshStandardMaterial, PointLight,  Mesh, MeshBasicMaterial ,PerspectiveCamera, BoxBufferGeometry, Color ,SphereGeometry, ConeGeometry } from "three";
import ExpoTHREE,{Renderer} from 'expo-three';
import { ExpoWebGLRenderingContext,GLView } from "expo-gl";
//import {GTLFLoader} from './threeJs_master/examples/jsm/loaders/GLTFLoader'
//import * as THREE from 'three'



let my_counter;
export default class App extends React.Component {

  constructor () {
    super();
    this.state = { counter: 1}
    my_counter=1;
  }

  onIncrement = () => {
    this.setState({
      counter: this.state.counter + 0.01,
    })
    my_counter= this.state.counter
   
  };

  onDecrement = () => {
    this.setState({
      counter: this.state.counter - 0.01,
    })
    my_counter= this.state.counter
    
  };

  
   
  
  render () {
    const counter = my_counter;
    let shape;
    if (counter <= 1.1) {
      shape = <Cube/>
    }
    else if (counter > 1.1 && counter < 1.2 ) {
      shape = <Sphere/>
    }
   else  if (counter >= 1.2) {
      shape = <Cone/>
    }

    
    return (
      <View style={styles.container}>
        { shape }
        <Text>Counter: { counter }</Text>
        <StatusBar  style="auto" />
        <View style={styles.button}>
          <Button
            title='Grow'
            
            onPress={this.onIncrement}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Shrink'
            
            onPress={this.onDecrement}
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
const Sphere = () => {
  const onContextCreate = (gl) => {
    // threejs code
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, gl.drawingBufferWidth/gl.drawingBufferHeight, 0.1, 1000);

    gl.canvas = {width: gl.drawingBufferWidth, height: gl.drawingBufferHeight};
    camera.position.z = 40;

    const renderer = new Renderer({gl});
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    
    const geometry = new SphereGeometry( 15, 32, 16 );
    const material = new MeshStandardMaterial({color: 'green'});
    const sphere = new Mesh(geometry, material);
    scene.add(sphere);

    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.set(5,5,5);
    scene.add(pointLight);

    const render = ()=>{
      requestAnimationFrame(render)

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      sphere.scale.set(my_counter,my_counter,my_counter)
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

const Cone = () => {
  const onContextCreate = (gl) => {
    // threejs code
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, gl.drawingBufferWidth/gl.drawingBufferHeight, 0.1, 1000);

    gl.canvas = {width: gl.drawingBufferWidth, height: gl.drawingBufferHeight};
    camera.position.z = 40;

    const renderer = new Renderer({gl});
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    
    const geometry = new ConeGeometry( 5, 20, 32 );
    const material = new MeshStandardMaterial({color: 'yellow'});
    const cone = new Mesh(geometry, material);
    scene.add(cone);

    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.set(5,5,5);
    scene.add(pointLight);

    const render = ()=>{
      requestAnimationFrame(render)

      cone.rotation.x += 0.01;
      cone.rotation.y += 0.01;
      cone.scale.set(my_counter,my_counter,my_counter)
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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginHorizontal: 20,
    marginTop: 5
  }
});