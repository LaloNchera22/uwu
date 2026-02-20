import { Image } from 'expo-image';
import { StyleSheet, View, Text, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Design } from '@/constants/Design';
import { FilterPill } from '@/components/ui/FilterPill';
import { PlanCard } from '@/components/ui/PlanCard';
import { useState } from 'react';

const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeo7NM4TcAGqTjhEQL9BWlOeeSKl_liuC0c1pUeYab62qKt4ZgwasI2kEyEbJnvPx4EED75L4xHsdaaYGpG-zfFVSkIrwxGviTbsD1Vb3rmDJphOoCC00-NTQStYl9ADcAdHkquZyojSHj8Jo668jsIVgVCpFDAO2BmiHwo2vFytb-3ewAN5zOMayHe8JuESlV4y7DaWtqcpGCta541eSfjdCBu2FQSVvoY7OA-9tooHIqF0RYGncPuwq1ZMEgul1GuZiMjBR0iB0";

const FILTERS = ["Todos", "Cerca de mí", "Hoy", "Fin de semana"];

const DATA = [
  {
    id: 1,
    title: "Pádel & Cervezas",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC-vwFuLBzL29FJ1ZLq12tz4J2SoKyfxHVAGWCMqr16fCCm_coUj_ST-J4fn1Gm4PlyR7XciZQhd_BIrpweQk3f8fmmuTVUh07r6TbvQuAcojPlx-FhL1x5mKBRV9j7eIdWTNUMqhxpFWYoHYNy3vGcN4Glya3PjFYpet273RHsqDHWQONiaklbyt-L8V4cYshpNcUTbr1ez6bOnmFz1_wyO-xPRVx2RLY0gYGaZq8jvqc4bd26-Mnd2_7JbLzBQqRIWfMnCnTX3I",
    category: "Deporte",
    categoryIcon: "figure.tennis",
    distance: "1.2km",
    date: "Mañana, 19:00 • Club de Campo",
    participants: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6thkv42nKNEWqD8wyQyi8kLo6BKKHGSdFBqqcipvjGKGJHtQseEd5RLXDY6CTfXlnsX18Xrz86fSnNtXfK50IV3RC45XridCLaad5KTnaGTOHwCpTZIDMdBxiFDdK3n9sG1iyEmMdZPmns6B8pZBRIx26fWg1RO5pxd77nSazpGGFnHHmp1Rbf5vc8edmfNDsXGq1lgYkdn91gsU3xqJXNp8zgrWYJprqETKbau_b0rxKphy0tzk6jOs35cw6_u3-16XNrMlln9A",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLBlXsNd2YjpJygqiuMFb2QZCqxyMZGgFbVfqPNhYH0ZT1hQQU34Qdv6MjjzjWYqP_5cCjiIJEqFz3wp9YbScXX4ig1idgJbSzhrvzgiY0LdnzLVjJC7ahLYJikqg0kytNIfCO7IgEQon-NVTaG32qucGiKU6JLr91CsMbBTV6CokDnXWM7T3D14ZOM4C4GWzEtTlryfPcZms39JuU_rGqmQKGoALLuxvU18g1896TSZLne_Ezr92iV6HXn5P8nWghUKyjatlTK4"
    ],
    extraParticipants: 2,
    seats: 2,
    maxSeats: 4,
  },
  {
    id: 2,
    title: "Cata de Vinos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL_mB-aMJwbC-3U3IgVCFz7buM_DYSG2-nCTLtAMxEMPIbvBJEBFh_KK7Swp7vtvz4KimepS5p4K_jRRIIC0vdKgi0zdIdHJQWl6nuo0FV7vaWkmybzf_8IADNCZhRNbnffUfFzh5RQ2rsSQn63K9_DN3wknJggGAi-57THrdqtmHkzIsHCSUu-90iOFNWb2khmue87Nxkfm5e10lIigd87eoTl_AZc8GjwMsEKN1EZoOfFHqXTmNnBP5E5zwC879LukXEtQRsVTg",
    category: "Gastro",
    categoryIcon: "wineglass.fill",
    distance: "Centro",
    date: "Sábado, 20:30 • Bar Las Cepas",
    participants: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBo7BjdOoaOPcOA4nbag2VyhY9LX7rGv8QdL0vICG3wFBtPWuwEoEI4E0jPL_N90bTmfowpp8nGRyVEJv7sw1OeQNZYZYv_WuOLGfoE_hFiqYioLPoHz8XEPGqJUmuOisKY699ksXZ40JCGi0p-HyA9xUeDsyDrb5SVBpNA21dOOrsvpMZHJ4zId8bcoZ4WFg1jC_5lhOlurhVxp_JEKXHP44syJMRqe2Fa8JKN2L0Ym7em1cowB2UDBg7UuzMrHy3VdQt3AKYE6z0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCV4TrTzYWeJ9w93-TWC1GEyOWDYog1ZAVU_CbT92_eFaAQgCwE60E0k0st7DqgzoQ74KU2ZWbvior2b04vNd0kAOSYf0BVbKVCj19IqxVYwXD4DFnRVigvWkWbX3ZIhEbbCbLNBVIAwuM0y5a9JCHHukNg2ehv-UjuFnCjqgOveALq_hURMs6Q4ENzskTjqYj5Cv3tKsq-TvciQCtM6hPc0pzBik0YZ8Ln_MC6Bz2tjwP4uxjCemsdDZuPsSgvYOirlh_yVDcTNA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhtQnQE5QwFhe9v6Gu7OAZasxUKpiZqvO0fbtdEYatpyVt78ykQWpKneC9LHw_8meUaNu534vzfKg3YrlnYaqS4YXXPB1oq7Nq0dl2g6yCc9XN4JkHyS3UZ6k-FG3GP99W5eHL4At6JJ6GAXoSbaEu4ulq0UjjkdQeKl8fZHe1aAM30zn8oK5eQ-lNpieMmX-TgW2GVLR6cCVq_JCzmxZBhOOEVFviXNqExR1P6tHjypJlmAq0NNY8qUgBT8jCtkZJ3yYg3T-dqf4"
    ],
    seats: 3,
    maxSeats: 4,
    isLastSeat: true,
  },
  {
    id: 3,
    title: "Senderismo Sierra",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARKUkyrQ7scezNLcD7H244wblJcdJUWcskCITf4SCQGPuuvZgRIvnZluDsP-OJuvHQovKhH394ZC1Pw_kXq59JHDa-baPCv7EOMB-JzUz10zGCyTQ8TqaWKKG-dOp1-w3A5ZG5d-xG0wKGhCqjoCeng_0lUiAtM10AOu75GgRa4UjDHeHvh2N08l2s1-I1GBd1h3PVbPlFP5FjpscWLaWXqRa0huunhNxRCgOJ6FcxW40XABzqGWatT8ZEJ2Q1PosoWAOhdeEAmp4",
    category: "Aire Libre",
    categoryIcon: "figure.hiking",
    distance: "30min",
    date: "Domingo, 09:00 • Cercedilla",
    participants: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_MIXE6WRl-4gp-47yMOQwwuiPeQjolo9Iz0eKdVzaDsPoGWK-vJ_2TxZRJDoQccmDCIt_46y8NRLTIkuXX7cYff8xEgrFTHW8K2IsUFO2dUl9-vkwjPvYT28_h2jhwPUwq_NVaenMS6UUahCYewFxLTR-8QdYugMdBr_d-Dc-uB9yiC4jPBwFf3qZC17gnbbkN3PJSRb3u6w9coOmcPBVc6v2surYSHPmLN9FXyLFLqPsi-4SaYSbo9g9oIuf18gEthcLPhIQKts"
    ],
    extraParticipants: 3,
    seats: 1,
    maxSeats: 4,
  }
];

export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[
        styles.safeArea,
        {
            backgroundColor: isDark ? Design.colors.backgroundDark : Design.colors.backgroundLight,
            paddingTop: insets.top
        }
    ]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[
          styles.container,
          { backgroundColor: isDark ? Design.colors.backgroundDark : Design.colors.backgroundLight }
      ]}>
        {/* Header */}
        <View style={[
            styles.header,
            { backgroundColor: isDark ? 'rgba(15, 35, 33, 0.95)' : 'rgba(245, 248, 248, 0.95)' }
        ]}>
            <View>
                <Text style={[styles.subtitle, { color: isDark ? Design.colors.slate400 : Design.colors.slate500 }]}>
                    Madrid, España
                </Text>
                <Text style={[styles.title, { color: isDark ? Design.colors.white : Design.colors.slate900 }]}>
                    Descubrir
                </Text>
            </View>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: USER_AVATAR }} style={styles.avatar} />
            </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
                {FILTERS.map((filter) => (
                    <FilterPill
                        key={filter}
                        label={filter}
                        isActive={activeFilter === filter}
                        onPress={() => setActiveFilter(filter)}
                    />
                ))}
            </ScrollView>
        </View>

        {/* Feed */}
        <ScrollView style={styles.feed} contentContainerStyle={styles.feedContent} showsVerticalScrollIndicator={false}>
            <View style={styles.feedGap}>
                {DATA.map(({ id, ...item }) => (
                    <PlanCard
                        key={id}
                        {...item}
                    />
                ))}
            </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '800', // extrabold
    letterSpacing: -0.5,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 229, 0.3)', // primary/30
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filtersScroll: {
    paddingHorizontal: 24,
    paddingBottom: 4, // for shadow
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingBottom: 128, // pb-32
    paddingTop: 16,
  },
  feedGap: {
    gap: 32, // gap-8 in tailwind (2rem = 32px)
  }
});
