import { ref, query, orderByChild, equalTo, get, set } from "firebase/database"
import { database } from "../Firebase/firebaseConfig"
import type { NewsletterSubscriber } from "../DataModels/NewsletterSubscriber"
import { logErrorToFirebase } from './errorService'

export async function createNewsletterSubscriber(email: string): Promise<string> {
  try {
    const cleanEmail = email.toLowerCase().trim()
    
    // Check existing subscription
    const subscribersRef = ref(database, 'newsletterSubscribers')
    const emailQuery = query(subscribersRef, orderByChild('email'), equalTo(cleanEmail))
    const snapshot = await get(emailQuery)

    if (snapshot.exists()) {
      throw new Error('Email already subscribed')
    }

    // Add new subscriber
    const newSubRef = ref(database, 'newsletterSubscribers/' + Math.random().toString(36).substr(2, 9))
    await set(newSubRef, {
      email: cleanEmail,
      subscribedAt: Date.now()
    })
    
    return newSubRef.key!
  } catch (error) {
    console.error('Error creating subscriber:', error)
    await logErrorToFirebase(error, 'createNewsletterSubscriber', { email });
    throw error
  }
}

export async function checkSubscription(email: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim()
  
  const subscribersRef = ref(database, 'newsletterSubscribers')
  const emailQuery = query(subscribersRef, orderByChild('email'), equalTo(cleanEmail))
  const snapshot = await get(emailQuery)

  return snapshot.exists()
}

export async function getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const snapshot = await get(ref(database, 'newsletterSubscribers'))
    if (!snapshot.exists()) return []

    const subscribers: NewsletterSubscriber[] = []
    snapshot.forEach((childSnapshot) => {
      subscribers.push({
        id: childSnapshot.key!,
        ...childSnapshot.val()
      })
    })

    return subscribers
  } catch (error) {
    console.error('Error getting subscribers:', error)
    await logErrorToFirebase(error, 'getAllNewsletterSubscribers');
    throw error
  }
} 