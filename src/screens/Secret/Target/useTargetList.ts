import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { styles } from './styles';

type Contact = {
  id: string;
  name: string;
  note: string;
};

export const useTargetList = () => {
  /* ---------------- HEADER ANIMATION ---------------- */
  const headerTranslateY = useRef(new Animated.Value(-80)).current;

  /* ---------------- DATA ---------------- */
  const contacts: Contact[] = [
    { id: '1', name: 'Harry Potter', note: 'Wizard at Hogwarts' },
    { id: '2', name: 'Hermione Granger', note: 'Minister of Magic' },
    { id: '3', name: 'Ron Weasley', note: 'Auror Department' },
    { id: '4', name: 'Albus Dumbledore', note: 'Headmaster (Retired)' },
    { id: '5', name: 'Severus Snape', note: 'Potions Master' },
    { id: '1', name: 'Harry Potter', note: 'Wizard at Hogwarts' },
    { id: '2', name: 'Hermione Granger', note: 'Minister of Magic' },
    { id: '3', name: 'Ron Weasley', note: 'Auror Department' },
    { id: '4', name: 'Albus Dumbledore', note: 'Headmaster (Retired)' },
    { id: '5', name: 'Severus Snape', note: 'Potions Master' },
    { id: '1', name: 'Harry Potter', note: 'Wizard at Hogwarts' },
    { id: '2', name: 'Hermione Granger', note: 'Minister of Magic' },
    { id: '3', name: 'Ron Weasley', note: 'Auror Department' },
    { id: '4', name: 'Albus Dumbledore', note: 'Headmaster (Retired)' },
    { id: '5', name: 'Severus Snape', note: 'Potions Master' },
  ];

  /* ---------------- LIST ANIMATIONS ---------------- */
  const itemAnimations = useRef(
    contacts.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(30),
    })),
  ).current;

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    // Header animation
    Animated.spring(headerTranslateY, {
      toValue: 0,
      tension: 120,
      friction: 14,
      useNativeDriver: true,
    }).start();

    // Staggered list animation
    Animated.stagger(
      80,
      itemAnimations.map(anim =>
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(anim.translateY, {
            toValue: 0,
            tension: 120,
            friction: 10,
            useNativeDriver: true,
          }),
        ]),
      ),
    ).start();
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const onAddPress = () => {
    console.log('Add contact pressed');
  };

  /* ---------------- RENDER ITEM ---------------- */
  // const renderItem = ({ item, index }: any) => {
  //   const anim = itemAnimations[index];

  //   return (
  //     <>
  //     <Animated.View
  //       style={[
  //         styles.card,
  //         {
  //           opacity: anim.opacity,
  //           transform: [{ translateY: anim.translateY }],
  //         },
  //       ]}
  //     >
  //       <Animated.Text style={styles.name}>{item.name}</Animated.Text>
  //       <Animated.Text style={styles.note}>{item.note}</Animated.Text>
  //     </Animated.View>
  //     </>
  //   );
  // };

  const renderItem = ({ item, index }: any) => {
    const anim = itemAnimations[index];
    console.log('🚀 ~ renderItem ~ anim:', anim, item);

    // const anim = itemAnimations[index];
    // return (
    // <>
    // </>
    // )
  };

  return {
    contacts,
    renderItem,
    onAddPress,
    itemAnimations,
    headerAnim: {
      transform: [{ translateY: headerTranslateY }],
    },
  };
};
