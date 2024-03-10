import { Dimensions, FlatList, Image, Linking, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../../theme/theme';

const Footer = () => {
  const { width } = Dimensions.get('window');
    const linkingHendale = (link) => {
        Linking.openURL(link);
  }
  const Item = ({ item }) => (
  <TouchableOpacity className=""style={styles.itemNave}>
    <Text style={styles.itemText}>{item.title}</Text>
  </TouchableOpacity>
 ); 
  return (
     <View className='flex-1 border border-t-8 border-[#1D70B8]'>
        <SectionList
          sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
            <View style={styles.item}>
                <TouchableOpacity onPress={()=>linkingHendale(item.link)}>
                    <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
            )}
            nestedScrollEnabled={true}
          scrollEnabled={false}
        /> 
      <View className="flex-1 mb-5 border-t py-2">
        <FlatList
        data={DataFooter}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <Item item={item}/> }
        nestedScrollEnabled={true}
        scrollEnabled={false}
        contentContainerStyle={{paddingLeft:10}}
        />
      </View>
       <View className="py-5 px-3">
        <View className="px-2 mb-2">
          <Image source={require('../../../assets/logo/cog.png')} />
        </View>
         <View className='flex-row flex-wrap  items-center px-2'style={{width:width}}>
          <Text style={{fontFamily:theme.fonts.medium}}>All content is available under the Open</Text>
            <TouchableOpacity><Text  style={{fontFamily:theme.fonts.bold,marginHorizontal:5,textDecorationLine: 'underline'}}>Government Licence v3.0</Text></TouchableOpacity>
           <Text  style={{fontFamily:theme.fonts.medium}}>except where otherwise stated</Text>
         </View>
        <View className='items-center py-3'>
          <Image className='w-28 h-28' source={{ uri: 'https://i.ibb.co/mtpvNbj/govuk-crest-87038e62e594b5f83ea40e0fb480fe7a5f41ba0db3917f709dfb39043f19a0f7.png' }} />
          <TouchableOpacity>
            <Text style={{ fontFamily: theme.fonts.bold, marginHorizontal: 5, textDecorationLine: 'underline' }}>© Crown copyright</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Footer

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 15;

const styles = StyleSheet.create({
    item: {
    padding: 12,
  },
  itemText: {
      fontSize: 16,
      textDecorationLine: 'underline',
      paddingBottom: 5,
      textAlign: 'left',
      fontFamily:theme.fonts.medium
      
  },
  sectionHeader: {
      padding: 16,
  },
  sectionHeaderText: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 5,
    fontFamily:theme.fonts.bold
  },
   itemNave: {
    alignItems: 'start',
    justifyContent: 'center',
    width: itemWidth, 
    margin: 5, 
  },
 
})

const data = [
  {
    title: 'Services and information',
        data: [
          {
            id: 0,
            title: 'Benefits', link: 'https://github.com/Rakibul2tr/'
          },
          {
            id: 1,
            title: 'Births,death,marriages and care', link: 'https://github.com/Rakibul2tr/'
          },
          {
            id: 2,
            title: 'Business and self-employed', link: 'https://github.com/Rakibul2tr/'
          },
          {
            id: 3,
            title: 'Childcare and parenting', link: 'https://github.com/Rakibul2tr/'
          },
          {
            id: 4,
            title: 'citizenship and living in the UK', link: 'https://github.com/Rakibul2tr/'
          },
    ],
  },
  {
    title: 'Government activity',
     data: [
        {id:0,title:'Departments',link:'https://github.com/Rakibul2tr/'},
        {id:1,title:'News',link:'https://github.com/Rakibul2tr/'},
        {id:2,title:'Guidance and rgulation',link:'https://github.com/Rakibul2tr/'},
        {id:3,title:'Research and statistics',link:'https://github.com/Rakibul2tr/'},
        {id:4,title:'Ploicy papers and consultations',link:'https://github.com/Rakibul2tr/'},
        {id:5,title:'Transparency',link:'https://github.com/Rakibul2tr/'},
    ],
  },
];

const DataFooter = [
  {
    id: '1',
    title: 'Help'
  },
  {
    id: '2',
    title: 'Privacy'
  },
  {
    id: '3',
    title: 'Cookies'
  },
  {
    id: '4',
    title: 'Accessibility statement'
  },
  {
    id: '5',
    title: 'Contact'
  },
  {
    id: '6',
    title: 'Terms and conditions'
  },
  {
    id: '7',
    title: 'rhesto o Wasanaethu Cymraeg'
  },
  {
    id: '8',
    title: 'government Digital Servie'
  },
  
];