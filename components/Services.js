import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Services = () => {
 // mock data
    const services = [
        {
            id: 1,
            name: "Haircut",
            img: "https://source.unsplash.com/featured/300x200",
            price: 20,
        },
        {
            id: 2,
            name: "shower",
            img: "https://source.unsplash.com/featured/300x201",
            price: 25,
        },
        { 
            id: 3,
            name: "massage",
            img: "https://source.unsplash.com/featured/300x202",
            price: 15,
        },
        { 
            id: 4,
            name: "highlights",
            img: "https://source.unsplash.com/featured/300x209",
            price: 15,
        },
    ]; 

  return (
    <View style={{padding: 10}}> 
        <Text style={{fontSize: 16, fontWeight: 500, marginBottom: 7 }}>Services Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}  > 
            {services.map((service,index) => (
                <Pressable key={index} style={{margin: 8, backgroundColor: "white", borderRadius: 7, padding: 20}}>
                    <Image source={{uri: service.img}} style={{width: 70, height: 70}} />
                    <Text style={{textAlign: "center", marginTop: 10  }}>{service.name}</Text>

                </Pressable>
            ))} 
        
        </ScrollView>
                                        
    </View>
  )
};

export default Services;

const styles = StyleSheet.create({})