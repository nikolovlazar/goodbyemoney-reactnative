import { View, Text } from 'react-native';
import { theme } from '../theme';

export const CategoryRow = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'flex-start',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    }}
  >
    <View
      style={{
        backgroundColor: color,
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'white',
      }}
    />
    <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>{name}</Text>
  </View>
);
