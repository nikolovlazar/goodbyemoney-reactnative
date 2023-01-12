import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { BSON } from 'realm';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import RealmContext from '../realm';
import { theme } from '../theme';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { CategoryRow } from '../components/CategoryRow';
import { Category } from '../models/category';

const { useQuery, useRealm } = RealmContext;

export const Categories = () => {
  const realm = useRealm();
  const categories = useQuery(Category);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(theme.colors.primary);
  const [newName, setNewName] = useState('');

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }

    realm.write(() => {
      realm.create('Category', Category.generate(newName, selectedColor));
    });

    setNewName('');
    setSelectedColor(theme.colors.primary);
  };

  const deleteCategory = (id: BSON.ObjectId) => {
    realm.write(() => {
      const category = realm.objectForPrimaryKey('Category', id);
      realm.delete(category);
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={112}
        style={{ margin: 16, flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              borderRadius: 11,
              overflow: 'hidden',
            }}
          >
            {categories.map(({ _id, color, name }) => (
              <Swipeable
                key={_id.toHexString()}
                renderRightActions={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: theme.colors.error,
                        width: 75,
                      }}
                    >
                      <RectButton
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => deleteCategory(_id)}
                      >
                        <EvilIcons name='trash' size={40} color='white' />
                      </RectButton>
                    </View>
                  );
                }}
              >
                <CategoryRow color={color} name={name} />
              </Swipeable>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowColorPicker(!showColorPicker)}
          >
            <View
              style={{
                backgroundColor: selectedColor,
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 3,
                borderColor: 'white',
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Category name'
            placeholderTextColor={theme.colors.textSecondary}
            onChange={(event) => setNewName(event.nativeEvent.text)}
            value={newName}
            style={{
              color: 'white',
              height: 40,
              borderColor: theme.colors.border,
              borderWidth: 1,
              flex: 1,
              borderRadius: 8,
              paddingLeft: 8,
              marginLeft: 16,
            }}
          />
          <TouchableOpacity
            onPress={createCategory}
            style={{
              padding: 12,
            }}
          >
            <FontAwesome name='send' size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        transparent
        visible={showColorPicker}
        animationType='fade'
        onRequestClose={() => setShowColorPicker(false)}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              padding: 24,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.card,
              overflow: 'hidden',
              borderRadius: 12,
            }}
          >
            <ColorPicker
              hideSliders
              color={selectedColor}
              onColorChange={(color) => onSelectColor(fromHsv(color))}
              style={{ width: '100%', height: 300 }}
            />
            <Button onPress={() => setShowColorPicker(false)} title='Select' />
          </View>
        </View>
      </Modal>
    </>
  );
};
