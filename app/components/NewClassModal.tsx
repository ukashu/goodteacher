import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 

type NewClassProps = {
  setShowModal: () => void
}

export default function NewClassModal(props: NewClassProps) {
    return (
        <View style={tw`items-center p-10`}>
          <Text>new class modal</Text>
          <View style={tw`mt-30 h-70% w-100% bg-red-200`}>
            <TouchableOpacity onPress={props.setShowModal}>
              <Ionicons name="arrow-back" size={40} color="blue"/>
            </TouchableOpacity>
          </View>
        </View>
    )
}