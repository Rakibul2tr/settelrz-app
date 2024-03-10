import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import theme from '../theme/theme';


const TypewriterEffect = ({ words, speed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isWriting, setIsWriting] = useState(true);

  useEffect(() => {
      const currentWord = words[currentIndex];
    const timer = setInterval(() => {
      if (isWriting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setIsWriting(false);
          setTimeout(() => setIsWriting(true), 3000); // Pause for 1 second
          
        }
      } else {
        
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          
        } else {
          setCurrentIndex((prevIndex) => {
            if(words.length % 2){
              
              return (prevIndex+1) % words.length
            }else{
              
               return (prevIndex+1) % words.length
            }
          });
          
        }
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, displayText, isWriting, words, speed]);

  const colors = ['white', '#ffffff', 'blue', '#4caf50', '#1affff', '#8cff1a']
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

   const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  useEffect(() => {
    const interval = setInterval(changeColor, 4000); // Change color every 2 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);
  
  return (
    <View>
      <Text className="text-4xl" style={{fontWeight:'bold' ,fontFamily:theme.fonts.bold,color:colors[currentColorIndex]}}>{displayText}</Text>
    </View>
  );
};

export default TypewriterEffect;