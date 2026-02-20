import { Image } from 'expo-image';
import { StyleSheet, View, Text, ScrollView, StatusBar, useColorScheme, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Design } from '@/constants/Design';
import { FilterPill } from '@/components/ui/FilterPill';
import { PlanCard } from '@/components/ui/PlanCard';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/supabase';

const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeo7NM4TcAGqTjhEQL9BWlOeeSKl_liuC0c1pUeYab62qKt4ZgwasI2kEyEbJnvPx4EED75L4xHsdaaYGpG-zfFVSkIrwxGviTbsD1Vb3rmDJphOoCC00-NTQStYl9ADcAdHkquZyojSHj8Jo668jsIVgVCpFDAO2BmiHwo2vFytb-3ewAN5zOMayHe8JuESlV4y7DaWtqcpGCta541eSfjdCBu2FQSVvoY7OA-9tooHIqF0RYGncPuwq1ZMEgul1GuZiMjBR0iB0";

const FILTERS = ["Todos", "Cerca de mí", "Hoy", "Fin de semana"];

export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [plans, setPlans] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';

  useFocusEffect(
    useCallback(() => {
      fetchPlans();
    }, [])
  );

  async function fetchPlans() {
    const { data: { user } } = await supabase.auth.getUser();
    setUserId(user?.id || null);

    const { data, error } = await supabase
      .from('plans')
      .select(`
        *,
        plan_participants (
          profile_id,
          profile:profiles(avatar_url)
        )
      `)
      .eq('status', 'open');

    // Fetch saved plans if user is logged in
    let savedPlanIds = new Set();
    if (user) {
        const { data: savedData } = await supabase
            .from('saved_plans')
            .select('plan_id')
            .eq('profile_id', user.id);

        if (savedData) {
            savedData.forEach((s: any) => savedPlanIds.add(s.plan_id));
        }
    }

    if (error) {
      console.error('Error fetching plans:', error);
      return;
    }

    if (data) {
      const formattedPlans = data.map((plan: any) => {
        // Safe access to nested properties
        const participants = plan.plan_participants || [];
        const participantAvatars = participants.map((p: any) => p.profile?.avatar_url).filter(Boolean);

        const seats = participants.length;
        const isJoined = user ? participants.some((p: any) => p.profile_id === user.id) : false;

        // Format date: "Mañana, 19:00" or similar
        const dateObj = new Date(plan.event_date);
        const dateString = dateObj.toLocaleDateString('es-ES', { weekday: 'long', hour: '2-digit', minute: '2-digit' });

        return {
          id: plan.id,
          title: plan.title,
          image: plan.image_url,
          category: plan.category,
          categoryIcon: plan.activity_type || 'star',
          distance: plan.location_name || 'Ubicación desconocida',
          date: `${dateString} • ${plan.location_name || ''}`,
          participants: participantAvatars.slice(0, 3),
          extraParticipants: Math.max(0, seats - 3),
          seats: seats,
          maxSeats: plan.max_spots,
          isLastSeat: plan.max_spots - seats === 1,
          isJoined,
          isSaved: savedPlanIds.has(plan.id),
        };
      });
      setPlans(formattedPlans);
    }
  }

  async function handleJoin(planId: string) {
    if (!userId) {
      Alert.alert("Acceso requerido", "Debes iniciar sesión para unirte a un plan");
      return;
    }

    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    if (plan.isJoined) {
       Alert.alert("Información", "Ya estás apuntado a este plan");
       return;
    }

    if (plan.seats >= plan.maxSeats) {
        Alert.alert("Completo", "Este plan ya no tiene plazas disponibles");
        return;
    }

    const { error } = await supabase.from('plan_participants').insert({
        plan_id: planId,
        profile_id: userId,
        status: 'confirmed'
    });

    if (error) {
        Alert.alert("Error", "No se pudo unir al plan: " + error.message);
    } else {
        Alert.alert("¡Genial!", "Te has unido al plan");
        fetchPlans();
    }
  }

  async function handleSave(planId: string) {
    if (!userId) {
       Alert.alert("Acceso requerido", "Inicia sesión para guardar planes");
       return;
    }

    const plan = plans.find(p => p.id === planId);
    const isSaved = plan?.isSaved;

    // Optimistic update
    setPlans(plans.map(p => p.id === planId ? { ...p, isSaved: !isSaved } : p));

    if (isSaved) {
        const { error } = await supabase.from('saved_plans').delete().match({ plan_id: planId, profile_id: userId });
        if (error) { console.error(error); fetchPlans(); }
    } else {
        const { error } = await supabase.from('saved_plans').insert({ plan_id: planId, profile_id: userId });
        if (error) { console.error(error); fetchPlans(); }
    }
  }

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
                {plans.map(({ id, ...item }) => (
                    <PlanCard
                        key={id}
                        id={id}
                        {...item}
                        onJoin={handleJoin}
                        onSave={handleSave}
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
