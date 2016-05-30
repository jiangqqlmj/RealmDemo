/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
const Realm=require('realm');
class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
class RealmModelsDemo extends Component {
  render() {
    const CarSchema={
      name:'Car',
      primaryKey:'id',
      properties:{
        id:'int',
        name:'string',
        model:'string',
        drive:'string',
      }
    };
    //进行初始化realm
    let realm=new Realm({schema:[CarSchema]});
    return (
      <View style={{marginTop:20}}>
        <Text style={styles.welcome}>
           Realm基础使用实例-增删改查
        </Text>     
        <CustomButton  text="表新增" 
            onPress={()=>
               realm.write(()=>{
                  realm.create('Car',{id:1,name:'Benz',model:'C350',drive:'张三'});
                  realm.create('Car',{id:2,name:'Benz',model:'E250',drive:'李四'});
                  realm.create('Car',{id:3,name:'BMW',model:'740Li',drive:'王五'});
                  realm.create('Car',{id:4,name:'Mazda',model:'CX-5',drive:'赵六'});
                  realm.create('Car',{id:5,name:'大众',model:'辉腾',drive:'张飞'});
                  ToastAndroid.show('添加数据完成...',ToastAndroid.SHORT);
                })
            }
        />
        <CustomButton  text="表修改"
            onPress={()=>{
                realm.write(()=>{
                  //进行更新id=1的数据,drive修改成赵云
                  realm.create('Car',{id:1,drive:'赵云'},true);
                  ToastAndroid.show('表修改完成...',ToastAndroid.SHORT);
                })
            }}
        />
        <CustomButton  text="表数据删除-删除id=3的数据"
            onPress={()=>{
                realm.write(()=>{
                  let cars=realm.objects('Car');
                  let car=cars.filtered('id==3');
                  realm.delete(car); 
                })
            }}
        />
        <CustomButton text="查询所有数据"
            onPress={()=>{
              let cars=realm.objects('Car');
              ToastAndroid.show('Car的数据为:'+cars.length+"辆",ToastAndroid.SHORT);
            }}
        />
        <CustomButton text="根据id=1进行查询数据"
            onPress={()=>{
                let cars=realm.objects('Car');
                let car=cars.filtered('id==1');
                if(car){
                  ToastAndroid.show('Car的数据为:编号='+car[0].id+',name='+car[0].name+',model='+car[0].model+',drive='+car[0].drive,ToastAndroid.SHORT);
                }
            }}
        />
        <CustomButton text="模糊查询name已M开头"
            onPress={()=>{
                let cars=realm.objects('Car');
                let car=cars.filtered('name BEGINSWITH "M" ');
                if(car){
                  ToastAndroid.show('Car的数据为:编号='+car[0].id+',name='+car[0].name+',model='+car[0].model+',drive='+car[0].drive,ToastAndroid.SHORT);
                }
            }}
        />    
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    margin:3,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
});

AppRegistry.registerComponent('RealmDemo', () => RealmModelsDemo);
