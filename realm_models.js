/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const Realm=require('realm');
class RealmModelsDemo extends Component {
  render() {
    //创建Person模型 cars:{type:'list',objectType:'Car'},
    const PersonSchema={
      name:'Person',
      properties:{
        name:'string',
        nickname:'string',
        birthday:'date',
        picture:{type:'string',optional:true}
      }
    };
    //进行初始化realm
    let realm=new Realm({schema:[PersonSchema]});
    //进行写数据到表中
    //1.首先写入Car数据
    realm.write(()=>{
        let person=realm.create('Person',{
          name:'张三',
          nickname:'我是昵称',
          picture:'http://www.lcode.org',
          birthday:new Date(1995, 11, 25),
        });
    });
    let person=realm.objects('Person')[0];
    return (
      <View style={{marginTop:20}}>
        <Text style={styles.welcome}>
           Realm基础使用实例
        </Text>
        <Text>数据库中存储的数据为:</Text>
        <Text>name:{person.name}</Text>  
        <Text>nickname:{person.nickname}</Text>  
        <Text>picture:{person.picture}</Text>      
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
});

AppRegistry.registerComponent('RealmDemo', () => RealmModelsDemo);
