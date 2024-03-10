import {  Dimensions, FlatList, Image,  ScrollView,  StyleSheet,  Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import theme from '../../theme/theme';
import { useColorScheme } from 'nativewind';


const Data = [
  {
    id: 1,
    title: 'Immigration Law Assistance',
    image: 'https://i.ibb.co/w7Yq9NP/Law-Judiciary-Exam-1024x576.jpg',
    link: 'https://example.com/link1',
    count:120
  },
  {
    id: 2,
    title: 'Learn Driving.',
    image: 'https://i.ibb.co/7VjT5Bv/photo-1449965408869-eaa3f722e40d-auto-format-fit-crop-q-80-w-1000-ixlib-rb-4-0.jpg',
    link: 'https://example.com/link2',
    count:113
  },
  {
    id: 3,
    title: 'Supermarkets',
    image: 'https://i.ibb.co/0YkJ5qD/9412-jpg-wh1200.jpg',
    link: 'https://example.com/link3',
    count:130
  },
  {
    id: 4,
    title: 'Nursery for Kids',
    image: 'https://i.ibb.co/VpgyhPP/lovepik-nurse-caring-for-patients-png-image-401722790-wh1200.png',
    link: 'https://example.com/link2',
    count:150
  },
  

  {
    id: 5,
    title: 'Cleaning services',
    image: 'https://i.ibb.co/Zh6qzpv/home-deep-cleaning-sofa-cleaning-bathroom-cleaning-500x500.jpg',
    link: 'https://example.com/link3',
    count:20
  },
   {
    id:6 ,
    title: 'Private Nursing',
    image: 'https://i.ibb.co/zZsTzRS/lovepik-nurse-taking-care-of-patient-png-image-401727010-wh1200.png',
     link: 'https://example.com/link2',
    count:180
  },
   {
    id:7 ,
    title: 'Courier Service',
    image: 'https://1021sunrise.com/wp-content/uploads/2019/08/courier-service-1024x682.jpeg',
     link: 'https://example.com/link2',
    count:120
  },
   {
    id:8 ,
    title: 'Insurance Companies',
    image: 'https://i.ibb.co/QMWrvzW/Blog-Feature-Image-How-Insurance-Companies-Can-Ensure-Customer-Retention-with-Click-Dimensions.png',
     link: 'https://example.com/link2',
    count:120
  },
   {
    id:9 ,
    title: 'Child Minding',
    image: 'https://pf1.childcare.co.uk/img/63fcd5b6d5540.png',
     link: 'https://example.com/link2',
    count:110
  },
   {
    id:10 ,
    title: 'Sports Coaching',
    image: 'https://i.ibb.co/K6vx8xr/cpdcourses-sportscoaches.jpg',
     link: 'https://example.com/link2',
    count:120
  },
   {
    id:11 ,
    title: 'Migrant Job Search',
    image: 'https://i.ibb.co/9W6ZFs1/Crem-Looking-for-a-job-pic.jpg',
     link: 'https://example.com/link2',
    count:70
  },
   {
    id:12 ,
    title: 'English Tutorials',
    image: 'https://www.candelasegitim.com/images_upload/images/OKUL%20Logolari/wse%20uk(1).JPG',
     link: 'https://example.com/link2',
    count:130
  },
   {
    id:13 ,
    title: 'Electronic Stores',
    image: 'https://c8.alamy.com/comp/C0TH64/currysdigital-electronic-goods-shop-holborn-london-england-uk-C0TH64.jpg',
     link: 'https://example.com/link2',
    count:5
  },
   {
    id:14 ,
    title: 'Country Groceries',
    image: 'https://oldcountrymarket.com/wp-content/uploads/2023/05/market-aisle.jpgtaking-care-of-patient-png-image-401727010-wh1200.png',
     link: 'https://example.com/link2',
    count:10
  },
   {
    id:15 ,
    title: 'Movie Theaters',
    image: 'https://i.ibb.co/r6Z0H8Y/a-view-of-the-regal-loews-cinemas-movie-theater-getty-h-2020.jpg',
     link: 'https://example.com/link2',
    count:3
  },
   {
    id:16 ,
    title: 'Flight Tickets',
    image: 'https://i.ibb.co/LxMhSDW/NINTCHDBPICT000737329624.jpg',
     link: 'https://example.com/link2',
    count:5
  },
   {
    id:17 ,
    title: 'Entertainment',
    image: 'https://i.ibb.co/pR9m5rs/Getty-Images-1248522924.jpg',
     link: 'https://example.com/link2',
    count:5
  },
   {
    id:18 ,
    title: 'Places to worship',
    image: 'https://i.ytimg.com/vi/Ttwi_ScO55k/maxresdefault.jpg',
     link: 'https://example.com/link2',
    count:7
  },
   {
    id:19 ,
    title: 'Rent a Car',
    image: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_649362670_395940.jpg',
     link: 'https://example.com/link2',
    count:10
  },
];
const Services = ({navigation}) => {
  const { colorScheme } = useColorScheme()
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const Item = ({ item }) => (
    <View className=" min-h-64 border border-gray-300 rounded-md bg-white dark:bg-slate-900 dark:border-gray-600 relative"
      style={{ width:(width/2)-16,margin:6 }}>
        <View className="h-28">
         <Image source={{uri:item.image}} className="w-full h-full rounded-tl-md rounded-tr-md" />
        </View>
       <TouchableOpacity onPress={()=>navigation.navigate('Category Page',{data:item})}
       className="bg-[#d90429] justify-center rounded-lg dark:bg-[theme.colors.background] dark:border-white dark:border absolute h-9"
       style={{ width:width/5,left:(width/7)-8,top:95}}>
         <Text className="text-center text-sm text-white dark:text-white "  style={{fontFamily:theme.fonts.bold}}>Explore</Text>
       </TouchableOpacity>

       <View className="items-start py-5">
        <Text className="text-lg text-start font-semibold dark:text-white px-3" numberOfLines={2} style={{ fontFamily: theme.fonts.bold }}>{item.title}</Text>
        <Text className="text-md text-start dark:text-white px-3" numberOfLines={1} style={{ fontFamily: theme.fonts.regular }}>{item.count}+ locations</Text>
        </View>
     </View>
);
   
  return (
    <SafeAreaView className='flex-1 bg-[#fff] dark:bg-black items-center justify-between'style={{width:width,height:height}}>
      <View className="items-center mb-1 pt-1 dark:w-auto rounded-md bg-white dark:bg-black "
        style={{width:width-20}}
      >
        {
          colorScheme=='dark'?<Image source={require('../../../assets/logo/logo-white.png')}
          className="w-2/5 h-12"
          /> :
          <Image source={require('../../../assets/logo/logo-dark.png')}
          className="w-2/5 h-12"
        />
        }
        
        
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <Text className="dark:text-white text-2xl text-center pb-2"style={{fontFamily:theme.fonts.bold}}>Access all the Services</Text>
        <FlatList
          data={Data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          />
        </ScrollView>
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default Services

const styles = StyleSheet.create({
 
})
