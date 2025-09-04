"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations = {
  en: {

    nav: {
      home: 'Home',
      pricing: 'Pricing',
      gallery: 'Gallery',
      about: 'About Us',
      login: 'Sign In',
      getStarted: 'Get Started',
      aiGenerator: 'AI Generator'
    },
    hero: {
      title: 'Transform Your Ideas Into Stunning Figurines',
      subtitle: 'Create beautiful, unique figurines in seconds with our advanced AI 3D model generation technology',
      cta: 'Start Creating Now',
      learnMore: 'Learn More',
      examplePrompt: 'Cute anime girl figurine with pink hair',
    },
    what: {
      title: 'What is Nano Banana?',
      subtitle: 'An AI-powered platform that transforms your text descriptions into stunning 3D figurines',
      feature1: {
        title: 'AI-Powered Generation',
        desc: 'Advanced artificial intelligence transforms your text descriptions into stunning, unique 3D figurines in seconds',
      },
      feature2: {
        title: 'Multiple Figurine Styles',
        desc: 'Choose from anime, realistic, chibi, fantasy, and dozens of other figurine styles',
      },
      feature3: {
        title: 'High-Quality 3D Models',
        desc: 'Generate detailed 3D models perfect for 3D printing, gaming, and collectibles',
      },
      feature4: {
        title: 'Lightning Fast',
        desc: 'Get your custom figurine model in under 30 seconds. No waiting, no delays - just instant creativity',
      },
    },
    why: {
      title: 'Why Choose Nano Banana?',
      subtitle: 'Experience the future of 3D figurine creation',
      reason1: {
        title: 'Privacy & Security',
        desc: 'Your prompts and generated 3D models are completely private. We never store or share your creative content without permission',
        stats: 'Privacy First'
      },
      reason2: {
        title: 'Trusted by Creators',
        desc: 'Join over 500,000 artists, designers, and creators who rely on Nano Banana for their figurine projects',
        stats: 'Creator Trusted'
      },
      reason3: {
        title: 'Industry Leading',
        desc: 'Our AI models are trained on the latest technology, delivering superior quality 3D models compared to other platforms',
        stats: 'Top Quality'
      },
      reason4: {
        title: 'Constantly Improving',
        desc: 'We regularly update our AI models and add new features based on user feedback and technological advances',
        stats: 'Always Evolving'
      },
      stats: {
        uptime: 'Uptime Guarantee',
        support: 'Customer Support',
        images: 'Figurines Generated',
        styles: 'Figurine Styles',
      },
    },
    how: {
      title: 'How It Works',
      subtitle: 'Three simple steps to create your figurine',
      step1: {
        title: 'Enter your prompt',
        desc: 'Describe your figurine vision in simple words. Be as creative and detailed as you want',
      },
      step2: {
        title: 'Choose your style',
        desc: 'Select from various figurine styles like anime, realistic, chibi, fantasy, and more',
      },
      step3: {
        title: 'Download your model',
        desc: 'Get your stunning AI-generated 3D figurine model, ready for 3D printing or use',
      },
    },
    stats: {
      images: 'Figurines Created',
      users: 'Active Users',
      uptime: 'Uptime',
      support: 'Support',
    },
    testimonials: {
      title: 'What Our Users Say',
      subtitle: 'Join thousands of satisfied creators who have transformed their ideas into stunning figurines with Nano Banana. Here\'s what they have to say about their Nano Banana experience',
      user1: {
        name: 'Sarah Chen',
        role: '3D Artist',
        text: 'Nano Banana has revolutionized my creative workflow. The quality of AI-generated 3D figurines is absolutely stunning, and the variety of styles available is incredible. I use it daily for my client projects.',
      },
      user2: {
        name: 'Marcus Rodriguez',
        role: 'Game Developer',
        text: 'As a game developer, I need high-quality 3D models quickly. Nano Banana delivers exactly that. The speed and quality are unmatched, and it has saved our team countless hours and budget.',
      },
      user3: {
        name: 'Emily Watson',
        role: 'Collector',
        text: 'I was skeptical about AI-generated figurines at first, but Nano Banana completely changed my mind. The models are so detailed and creative - sometimes even better than what I had imagined. It\'s like having a personal sculptor.',
      },
      user4: {
        name: 'David Kim',
        role: '3D Printer',
        text: 'For 3D printing and collectibles, Nano Banana is a game-changer. The variety of styles and the ability to iterate quickly has accelerated my production process significantly. Highly recommended!',
      },
      user5: {
        name: 'Lisa Thompson',
        role: 'Small Business Owner',
        text: 'Running a small business, I needed affordable yet professional 3D models for my products. Nano Banana provides exactly that. The quality rivals expensive commissioned work, but with complete customization.',
      },
      user6: {
        name: 'Alex Johnson',
        role: 'Freelance Designer',
        text: 'The creative possibilities with Nano Banana are endless. I can explore ideas and concepts that would take hours to create manually. It\'s become an essential tool in my design arsenal.',
      },
      stats: {
        averageRating: 'Average Rating',
        happyUsers: 'Happy Users',
        imagesGenerated: 'Figurines Generated',
        satisfactionRate: 'Satisfaction Rate',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about Nano Banana',
      contact: 'Still have questions? We\'re here to help!',
      contactButton: 'Contact Support',
      q1: 'How does Nano Banana work?',
      a1: 'Nano Banana uses advanced AI models to interpret your text descriptions and generate corresponding 3D figurine models. Simply type what you want to create, select your preferred style, and our AI will create a unique 3D model in seconds.',
      q2: 'What kind of figurines can I generate?',
      a2: 'You can generate virtually any type of figurine - from anime characters to realistic figures, chibi style, fantasy creatures, animals, and more. Our AI supports over 150 different figurine styles and can handle complex, detailed prompts.',
      q3: 'Is there a limit to how many figurines I can create?',
      a3: 'Free users can generate up to 10 figurines per day. Premium subscribers get unlimited generations, priority processing, and access to advanced features like higher detail levels and exclusive figurine styles.',
      q4: 'What quality are the generated 3D models?',
      a4: 'Free users receive models at standard quality. Premium users can generate high-detail models perfect for 3D printing, gaming, and professional use.',
      q5: 'Can I use the generated figurines commercially?',
      a5: 'Yes! All figurines generated with Nano Banana can be used for commercial purposes. You retain full rights to your creations, including the ability to sell, modify, and distribute them as you wish.',
      q6: 'How long does it take to generate a figurine?',
      a6: 'Most figurines are generated within 15-30 seconds. Premium users enjoy priority processing, which can reduce generation time to as little as 10 seconds during peak hours.',
      q7: 'What makes Nano Banana different from other AI generators?',
      a7: 'Nano Banana focuses on 3D figurine generation with quality, speed, and user experience. We use the latest AI models, offer more figurine styles than competitors, provide better prompt understanding, and maintain the highest 3D model quality standards in the industry.',
      q8: 'Is my data safe and private?',
      a8: 'Absolutely. We take privacy seriously. Your prompts and generated 3D models are encrypted and never shared with third parties. You can delete your account and all associated data at any time.',
    },
    footer: {
      description: 'Transform your ideas into stunning 3D figurines with Nano Banana AI. Create, share, and discover amazing 3D models through simple text prompts.',
      company: 'Company',
      product: 'Product',
      support: 'Support',
      legal: 'Legal',
      copyright: '© 2025 Nano Banana. All rights reserved.',
      madeWith: 'Made with ❤️ for creators',
      poweredBy: 'Powered by AI',
      about: 'About Us',
      careers: 'Careers',
      press: 'Press',
      blog: 'Blog',
      features: 'Features',
      pricing: 'Pricing',
      api: 'API',
      help: 'Help Center',
      community: 'Community',
      contact: 'Contact Us',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      gdpr: 'GDPR',
      refundPolicy: 'Refund Policy'
    },
    auth: {
      login: {
        title: 'Welcome Back',
        subtitle: 'Sign in to your account',
        email: 'Email Address',
        password: 'Password',
        forgotPassword: 'Forgot Password?',
        loginButton: 'Sign In',
        loggingIn: 'Signing In...',
        orContinueWith: 'Or continue with',
        noAccount: "Don't have an account yet?",
        signUp: 'Sign Up Now',
        error: 'An error occurred during sign in'
      },
      signup: {
        title: 'Create Account',
        subtitle: 'Start your AI creation journey',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        createAccount: 'Create Account',
        creating: 'Creating Account...',
        orContinueWith: 'Or continue with',
        hasAccount: 'Already have an account?',
        signIn: 'Sign In Now',
        error: 'An error occurred during sign up',
        passwordMismatch: 'Passwords do not match'
      },
      oauth: {
        error: 'OAuth sign in failed'
      },
      forgotPassword: {
        title: 'Forgot Password',
        subtitle: 'We will send a reset link to your email',
        email: 'Email Address',
        sendButton: 'Send Reset Link',
        sending: 'Sending...',
        backToLogin: 'Back to Login',
        successMessage: 'Password reset link has been sent to your email',
        errorMessage: 'An error occurred while sending the reset link'
      }
    },
    privacy: {
      badge: 'Privacy Protection',
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: August 2025',
      section1: {
        title: 'Information Collection',
        desc: 'Types of information we collect and how we use it to improve your experience.',
        item1: 'Account Information: Username, email address, and basic account settings',
        item2: 'Usage Data: Generated images, feature usage, and interaction records',
        item3: 'Technical Information: Device information, browser type, and IP address',
        item4: 'Payment Information: Processed through secure third-party payment processors'
      },
      section2: {
        title: 'Information Usage',
        desc: 'How we use collected information to provide and improve our services.',
        item1: 'Provide and improve AI image generation services',
        item2: 'Personalize user experience and recommendations',
        item3: 'Process payments and manage accounts',
        item4: 'Send service updates and important notifications',
        item5: 'Ensure service security and prevent abuse'
      },
      section3: {
        title: 'Information Sharing',
        desc: 'We do not sell, trade, or transfer your personal information to third parties unless we have your explicit consent or legal requirements.',
        item1: 'Share with third parties only with your consent',
        item2: 'Necessary disclosures related to legal requirements',
        item3: 'Measures necessary to protect our rights and security',
        item4: 'Limited sharing with trusted service providers'
      },
      section4: {
        title: 'Data Security',
        desc: 'We implement industry-standard security measures to protect your personal information.',
        item1: 'SSL encryption to protect data transmission',
        item2: 'Regular security audits and vulnerability scans',
        item3: 'Restrict employee access to personal information',
        item4: 'Regular backups and disaster recovery plans'
      },
      section5: {
        title: 'Your Rights',
        desc: 'Your rights and control options regarding your personal information.',
        item1: 'Access and view your personal information',
        item2: 'Correct or update inaccurate information',
        item3: 'Delete your account and related data',
        item4: 'Opt out of marketing communications'
      },
      section6: {
        title: 'Contact Us',
        desc: 'If you have any questions about our privacy policy or need to exercise your rights, please contact us via the following methods.',
        email: 'privacy@nanobanana.com',
        response: 'We usually respond within 24 hours to your inquiries'
      }
    },
    terms: {
      badge: 'Terms of Service',
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: August 2025',
      section1: {
        title: 'Service Description',
        desc: 'Nano Banana provides AI-driven image generation services that allow users to create unique artworks through text prompts. Our services include image generation, storage, and sharing features.'
      },
      section2: {
        title: 'User Responsibilities',
        desc: 'When using our services, you must comply with the following:',
        item1: 'Do not generate illegal, harmful, or inappropriate content',
        item2: 'Do not infringe on others\' intellectual property or privacy rights',
        item3: 'Do not abuse services or conduct malicious attacks',
        item4: 'Do not share or disseminate harmful content',
        item5: 'Comply with all applicable laws and regulations'
      },
      section3: {
        title: 'Intellectual Property',
        desc: 'Intellectual property provisions regarding generated content and platform usage.',
        item1: 'You own images generated using our services',
        item2: 'We retain intellectual property rights to the platform and technology',
        item3: 'Do not copy or distribute our proprietary technology',
        item4: 'Comply with third-party content usage licenses',
        item5: 'Respect copyright protection for original content',
        item6: 'Do not use generated content for commercial purposes'
      },
      section4: {
        title: 'Service Limitations',
        desc: 'We reserve the right to limit or terminate services, including but not limited to:',
        item1: 'Violations of terms of service',
        item2: 'Malicious or abusive behavior',
        item3: 'Technical issues or maintenance requirements',
        item4: 'Legal or regulatory requirements',
        item5: 'Behavior exceeding reasonable use',
        item6: 'Behavior affecting other user experiences'
      },
      section5: {
        title: 'Disclaimer',
        desc: 'We provide services "as is" without any express or implied warranties. We are not responsible for service interruptions, data loss, or any direct or indirect damages.',
        item1: 'Service may be interrupted due to technical issues',
        item2: 'Quality of generated content is not guaranteed',
        item3: 'We are not responsible for any losses incurred from using the service',
        item4: 'Services may be changed or terminated at any time'
      },
      section6: {
        title: 'Account Management',
        desc: 'Provisions regarding account creation, use, and termination.',
        item1: 'You must provide true and valid registration information',
        item2: 'You are responsible for protecting your account security',
        item3: 'We may suspend or terminate non-compliant accounts',
        item4: 'Data will be deleted after account termination'
      },
      section7: {
        title: 'Dispute Resolution',
        desc: 'In case of disputes, we encourage friendly negotiation. If negotiation is not possible, disputes will be resolved according to applicable law.'
      },
      section8: {
        title: 'Applicable Law',
        desc: 'This service agreement is governed by the laws of the People\'s Republic of China. Any disputes will be submitted to the competent people\'s court for resolution.'
      },
      section9: {
        title: 'Contact Us',
        desc: 'If you have any questions about our service agreement or need help, please contact us via the following methods.',
        email: 'legal@nanobanana.com',
        response: 'We usually respond within 24 hours to your inquiries'
      },
      refundPolicy: {
        title: 'Refund Policy',
        lastUpdated: 'Last Updated: August 10, 2025',
        section1: {
          title: 'All Sales Are Final',
          desc: 'Due to the instant access nature of digital services, all subscription fees (including monthly/annual fees) are considered final transactions once paid and are non-refundable. This includes but is not limited to: unused subscription time, insufficient account usage, cancellation due to personal reasons, service functions meeting descriptions but not meeting user expectations.'
        },
        section2: {
          title: 'Subscription Cancellation',
          desc: 'When you cancel your subscription:',
          items: [
            'Cancellation only stops future automatic renewals and does not affect the current subscription period',
            'Your credits and service access remain valid until the end of the current billing cycle',
            'Similar to video membership services, you can continue using until the subscription period ends'
          ]
        },
        section3: {
          title: 'Service Interruption Exception Handling',
          desc: 'In case of major service interruptions:',
          items: [
            'For major service interruptions lasting more than 72 hours due to non-force majeure factors, users may apply for equivalent service time compensation',
            'This compensation is the only remedy and does not involve cash refunds',
            'Minor interruptions or planned maintenance do not qualify for compensation'
          ]
        },
        section4: {
          title: 'Dispute Resolution',
          desc: 'If you have any questions about charges, please contact us within 7 working days:',
          items: [
            'Contact media@nanobananamodle.com and provide the transaction ID',
            'Provide payment vouchers and problem description',
            'We will investigate and provide a written response within 15 working days',
            'All dispute resolution results are final decisions'
          ]
        },
        section5: {
          title: 'Policy Modification Rights',
          desc: 'nano-banana reserves the right to modify this policy at any time. Modified policies will take effect immediately after being publicly published on the website.',
          highlights: [
            'You have fully understood and accepted this policy',
            'You confirm the special nature of digital services',
            'You agree to waive any right to request refunds'
          ]
        },
        section6: {
          title: 'Terms Acknowledgment',
          desc: 'By paying subscription fees, you confirm that you have read, understood, and agreed to all terms in this refund policy.'
        },
        section7: {
          title: 'Contact Information',
          desc: 'If you have questions about this policy or billing, please contact us:',
          email: 'media@nanobananamodle.com'
        }
      }
    },
    cta: {
      title: 'Ready to Create Your Masterpiece?',
      subtitle: 'Join thousands of artists and creators who are already using Nano Banana',
      button: 'Get Started Now',
      badge: 'Start Creating Today',
      pricing: 'View Pricing',
      stats: {
        images: 'Images Created',
        users: 'Active Users',
        uptime: 'Uptime',
        support: 'Support',
      },
      testimonials: {
        averageRating: 'Average Rating',
        happyUsers: 'Happy Users',
        imagesGenerated: 'Images Generated',
        satisfactionRate: 'Satisfaction Rate',
      },
    },
    gallery: {
      title: 'Gallery of Figurines',
      subtitle: 'Explore stunning figurines created by our community using Nano Banana\'s AI technology. Get inspired and create your own masterpieces with Nano Banana',
      loadMore: 'Load More Works',
      prompt: 'Prompt:',
      refresh: 'Refresh Gallery',
      loginRequired: 'Please login to add figurines to your gallery',
      alreadyInGallery: 'This figurine is already in your gallery',
      addedToGallery: 'Successfully added to your gallery!',
      addFailed: 'Failed to add to gallery, please try again',
      removedFromGallery: 'Successfully removed from your gallery',
      deleteImage: 'Delete Image',
      zoomImage: 'Zoom Image',
      removeFailed: 'Failed to remove from gallery, please try again',
      operationFailed: 'Operation failed, please try again',
      promptCopied: 'Prompt copied to clipboard!',
      copyFailed: 'Failed to copy prompt, please try again',
      userGenerated: {
        badge: 'User Creation',
        title: 'User AI Generated Figurine',
        desc: 'A unique figurine created with Nano Banana AI technology',
        prompt: 'Your creative prompt',
        createdAt: 'Created on'
      },
      image1: {
        title: 'Mystical Fairy Figurine',
        desc: 'A magical fairy figurine with glowing wings and ethereal beauty',
      },
      image2: {
        title: 'Cyberpunk Robot Figurine',
        desc: 'A futuristic robot figurine with neon details and metallic finish',
      },
      image3: {
        title: 'Ocean Mermaid Figurine',
        desc: 'A serene mermaid figurine with vibrant ocean colors',
      },
      image4: {
        title: 'Mountain Dragon Figurine',
        desc: 'A majestic dragon figurine with dramatic wings and scales',
      },
      image5: {
        title: 'Space Explorer Figurine',
        desc: 'A stunning astronaut figurine with galaxy-themed details',
      },
      image6: {
        title: 'Abstract Art Figurine',
        desc: 'A vibrant abstract figurine with flowing artistic design',
      },
      image7: {
        title: 'Wildlife Animal Figurine',
        desc: 'A detailed animal figurine with realistic fur and features',
      },
      image8: {
        title: 'Architectural Figurine',
        desc: 'A modern building figurine with unique geometric patterns',
      },
      image9: {
        title: 'Vintage Car Figurine',
        desc: 'A classic vintage car figurine in nostalgic style',
      },
      prompt1: 'magical fairy figurine with glowing wings, ethereal beauty, fantasy style',
      prompt2: 'cyberpunk robot figurine, neon details, metallic finish, futuristic design',
      prompt3: 'mermaid figurine, ocean colors, serene beauty, aquatic theme',
      prompt4: 'dragon figurine, majestic wings, dramatic scales, fantasy creature',
      prompt5: 'astronaut figurine, galaxy details, space explorer, cosmic theme',
      prompt6: 'abstract figurine, vibrant colors, flowing design, artistic style',
      prompt7: 'animal figurine, detailed fur, realistic features, wildlife theme',
      prompt8: 'building figurine, geometric patterns, modern architecture, urban design',
      prompt9: 'vintage car figurine, classic design, nostalgic style, retro theme',
      // 新增图片的翻译
      image10: {
        title: 'Mint Water',
        desc: 'Refreshing mint water with natural beauty'
      },
      prompt10: 'Fresh mint water with natural beauty',
      image11: {
        title: 'Seashell',
        desc: 'Beautiful seashell with ocean charm'
      },
      prompt11: 'Beautiful seashell with ocean charm',
      image12: {
        title: 'Teacup',
        desc: 'Elegant teacup with traditional charm'
      },
      prompt12: 'Elegant teacup with traditional charm',
      image13: {
        title: 'Ocean Waves',
        desc: 'Dynamic ocean waves with natural power'
      },
      prompt13: 'Dynamic ocean waves with natural power',
      image14: {
        title: 'Seagull',
        desc: 'Graceful seagull flying over the ocean'
      },
      prompt14: 'Graceful seagull flying over the ocean',
      image15: {
        title: 'Lotus Leaf',
        desc: 'Fresh lotus leaf with natural beauty'
      },
      prompt15: 'Fresh lotus leaf with natural beauty',
      image16: {
        title: 'Architecture',
        desc: 'Modern architecture with urban charm'
      },
      prompt16: 'Modern architecture with urban charm',
      image17: {
        title: 'Jiangnan',
        desc: 'Traditional Jiangnan water town scenery'
      },
      prompt17: 'Traditional Jiangnan water town scenery',
      image18: {
        title: 'Old Alley',
        desc: 'Nostalgic old alley with historical charm'
      },
      prompt18: 'Nostalgic old alley with historical charm',
      image19: {
        title: 'Orange',
        desc: 'Fresh orange with natural beauty'
      },
      prompt19: 'Fresh orange with natural beauty',
      image20: {
        title: 'Ant',
        desc: 'Tiny ant with natural detail'
      },
      prompt20: 'Tiny ant with natural detail',
      image21: {
        title: 'Dragonfly',
        desc: 'Graceful dragonfly with natural beauty'
      },
      prompt21: 'Graceful dragonfly with natural beauty',
      image22: {
        title: 'Dragonfly Eye',
        desc: 'Detailed dragonfly eye with natural beauty'
      },
      prompt22: 'Detailed dragonfly eye with natural beauty',
      image23: {
        title: 'Little Mushroom',
        desc: 'Cute little mushroom with natural charm'
      },
      prompt23: 'Cute little mushroom with natural charm'
    },
    draw: {
      prompt: 'Generated from prompt:',
      heroExamplePrompt: 'Cute anime girl figurine with pink hair',
      title: 'AI Figurine Generator',
      subtitle: 'Transform your ideas into stunning 3D figurines with our advanced AI technology',
      promptPlaceholder: 'Describe what figurine you want to create...',
      styleLabel: 'Figurine Style',
      sizeLabel: 'Model Size',
      generateButton: 'Generate Figurine',
      generating: 'Generating...',
      downloadButton: 'Download',
      favoriteButton: 'Favorite',
      regenerateButton: 'Regenerate',
      successMessage: 'Figurine generated successfully!',
      errorMessage: 'Generation failed, please try again',
      waitingForGeneration: 'Waiting for generation',
      success: 'Success',
      describeYourIdea: 'Describe Your Figurine',
      describeYourIdeaDesc: 'Describe in detail what kind of figurine you want to generate',
      result: 'Generation Result',
      enterPromptAndClick: 'Enter a prompt and click the generate button',
      styleRealistic: '🎭 Realistic Style - Photorealistic figurine',
      styleAnime: '🎌 Anime Style - Japanese anime figurine',
      styleOilPainting: '🖼️ Chibi Style - Cute chibi figurine',
      styleWatercolor: '💧 Fantasy Style - Fantasy creature figurine',
      styleSketch: '✏️ Sketch Style - Minimalist figurine design',
      sizeSquare: '⬜ Small',
      sizePortrait: '📱 Medium',
      sizeLandscape: '🖥️ Large',
      sizeWidescreen: '🎬 Extra Large',
      sizeMobilePortrait: '📱 Mini',
      tip: 'Tip: The more detailed your description, the more the generated figurine will match your imagination',
      costCredits: 'Costs {credits} credits',
      loginRequired: 'Please Login First',
      loginRequiredDesc: 'You need to login to use the AI figurine generation feature',
      cancel: 'Cancel',
      goToLogin: 'Go to Login',
      generatedImage: 'Generated Figurine',
      generationFailed: 'Generation failed',
      insufficientCredits: 'Insufficient credits, please recharge first',
      creditConsumeError: 'Failed to consume credits, please try again',
      addedToGallery: 'Figurine automatically added to your gallery!',
      alreadyInGallery: 'Already in your gallery',
      addToGallery: 'Add to gallery',
      removedFromGallery: 'Figurine removed from your gallery',
      operationFailed: 'Operation failed, please try again',
      // 新增提示信息
      addToGalleryHint: 'Click the heart button to add to gallery',
      removeFromGalleryHint: 'Click the heart button to remove from gallery',
      imageSaved: 'Figurine saved, click heart button to show in gallery',
      // 图片上传相关
      uploadImage: 'Upload Reference Image',
      uploadImageDesc: 'Upload an image to generate a figurine based on it',
      clickToUpload: 'Click to upload image',
      supportedFormats: 'Supports JPG, PNG, WebP (Max 10MB)',
      optionalPrompt: 'Optional Description',
      imageRequired: 'Please upload an image',
      invalidFileType: 'Please upload a valid image file',
      fileTooLarge: 'File size too large (max 10MB)',
      uploadTip: 'Upload a clear reference image for the best results',
    },
    about: {
      badge: 'About Nano Banana',
      title: 'Revolutionizing AI Figurine Creation',
      subtitle: 'Nano Banana is at the forefront of AI-powered 3D creativity, empowering artists, designers, and creators to bring their wildest imaginations to life through cutting-edge artificial intelligence technology.',
      mission: {
        title: 'Our Mission',
        desc: 'To democratize 3D figurine creation by making professional-grade AI 3D model generation accessible to everyone. We believe that creativity should have no boundaries, and technology should amplify human imagination, not replace it.',
      },
      vision: {
        title: 'Our Vision',
        desc: 'A world where anyone can create stunning 3D figurines in seconds, where ideas flow freely from mind to 3D model, and where AI serves as the ultimate creative companion for human expression and innovation.',
      },
      feature1: {
        title: 'Advanced AI Technology',
        desc: 'Powered by state-of-the-art machine learning models, delivering high-quality, creative, and unique 3D figurine generation.',
      },
      feature2: {
        title: 'User-Centric Design',
        desc: 'Intuitive interface designed for creators of all skill levels, from beginners to professional 3D artists and designers.',
      },
      feature3: {
        title: 'Privacy & Security',
        desc: 'Enterprise-grade security measures to protect your creative work and ensure your intellectual property remains safe.',
      },
      stats: {
        images: 'Figurines Created',
        users: 'Active Users',
        uptime: 'Uptime',
        support: 'Support',
      },
      values: {
        title: 'Our Values',
        subtitle: 'These core principles guide everything we do at Nano Banana',
        value1: {
          title: 'Excellence',
          desc: 'We strive for excellence in every aspect of our service, from AI quality to user experience.',
        },
        value2: {
          title: 'Creativity',
          desc: 'We celebrate and nurture creativity, believing it\'s the foundation of human progress.',
        },
        value3: {
          title: 'Community',
          desc: 'We build and support a vibrant community of creators, artists, and innovators.',
        },
      },
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Flexible credit-based pricing, only 10 credits per figurine generation',
      creditInfo: 'Each AI figurine generation costs 10 credits',
      basic: 'Basic Plan',
      advanced: 'Advanced Plan',
      professional: 'Professional Plan',
      price: 'price',
      oneTime: '/ one-time',
      credits: 'credits',
      generations: 'generations',
      features: {
        basic: [
          '500 Credits',
          '50 AI Figurine Generations',
          'Basic Model Quality',
          'Standard Support',
          '7-Day Refund'
        ],
        advanced: [
          '1000 Credits',
          '100 AI Figurine Generations',
          'HD Model Quality',
          'Priority Support',
          '30-Day Refund',
          'Exclusive Figurine Styles'
        ],
        professional: [
          '3000 Credits',
          '300 AI Figurine Generations',
          'Ultra HD Model Quality',
          '24/7 Dedicated Support',
          '90-Day Refund',
          'Exclusive Figurine Styles',
          'Batch Generation',
          'API Access'
        ]
      },
      popular: 'Most Popular',
      buyNow: 'Buy Now',
      whyChoose: 'Why Choose Our Credit System?',
      benefits: {
        flexible: {
          title: 'Flexible Usage',
          desc: 'Credits never expire, use anytime, no time limits'
        },
        transparent: {
          title: 'Transparent Pricing',
          desc: 'Fixed 10 credits per generation, clear pricing'
        },
        value: {
          title: 'High Value',
          desc: 'More cost-effective than pay-per-use'
        }
      },
      contact: 'Still have questions? Contact us for more information',
      startCreating: 'Start AI Figurine Creation',
      contactSupport: 'Contact Support',
      loginRequired: 'Please login to continue',
      loginRequiredMessage: 'You are not logged in, please login before making payment',
    },
    profile: {
      title: 'Personal Profile',
      subtitle: 'Manage your account information and view usage statistics',
      pleaseLogin: 'Please login first',
      goToLogin: 'Go to Login',
      loginRequired: 'Login Required',
      loginToView: 'Please login to view your profile',
      username: 'Username',
      userEmail: 'User Email',
      userPoints: 'User Points',
      freeAttempts: 'Free Attempts',
      verifiedUser: 'Verified User',
      accountSettings: 'Account Settings',
      startAICreation: 'Start AI Creation',
      startGenerating: 'Start Generating',
      viewGallery: 'View Gallery',
      buyCredits: 'Buy Credits',
      memberSince: 'Member Since',
      aiGenerations: 'AI Figurine Generations',
      usedThisMonth: 'Used This Month',
      collectedWorks: 'Collected Figurines',
      collectedWorksDesc: 'Collected figurines',
      membershipLevel: 'Membership Level',
      advancedUser: 'Advanced User',
      premiumUser: 'Premium User',
      creditsOverview: 'Credits Overview',
      availableCredits: 'Available Credits',
      creditsDescription: 'Credits for AI figurine generation',
      remainingGenerations: 'Remaining Generations',
      creditsValue: 'Credits Value',
      buyMoreCredits: 'Buy More Credits',
      aiGenerationHistory: 'AI Figurine Generation History',
      imageGeneration: 'Figurine Generation',
      credits: 'Credits',
      noGenerationsYet: 'No generations yet',
      // 新增翻译
      welcomeBack: 'Welcome back!',
      currentCredits: 'Current Credits',
      totalEarned: 'Total Earned',
      totalSpent: 'Total Spent',
      transactionHistory: 'Transaction History',
      consumption: 'Consumption',
      recharge: 'Recharge',
      generationResult: 'Generation Result',
      creditRecharge: 'Credit Recharge',
      packagePurchase: 'Package Purchase',
      noTransactionRecords: 'No transaction records',
      purchaseCredits: 'Purchase Credits',
      // 套餐相关翻译
      basicPackage: 'Basic Package',
      advancedPackage: 'Advanced Package',
      professionalPackage: 'Professional Package',
      rechargePoints: 'Recharge Points',
      // 新用户赠送积分翻译
      newUserGift: 'New User Gift Credits',
      // 赠送类型翻译
      gift: 'Gift'
    },
    // 悬浮球支持翻译
    floating_support: {
      title: 'Need Help?',
      message: 'If you encounter any problems during use, please contact us via email and we will help you solve them as soon as possible!',
      close: 'Close',
      customer_service_email: 'Customer Service Email',
      click_to_send: 'Click to send email',
      response_time: 'We usually respond within 24 hours'
    },
    caseStudy: {
      title: 'One Design, One Figurine Set',
      subtitle: 'A single character image can generate a complete figurine series with multiple styles and poses',
      originalTitle: 'Original Character Design',
      originalDesc: 'Input character reference image',
      conclusion: {
        title: '🎨 One Figurine Set, Multiple Possibilities',
        desc: 'Through AI technology, you can transform any character image into a complete figurine series. Whether anime, realistic, fantasy, or mecha style, all can generate matching figurine collectibles, turning your creative ideas into real figurine series.'
      }
    }
  },
  zh: {

    nav: {
      home: '首页',
      pricing: '定价',
      gallery: '画廊',
      about: '关于我们',
      login: '登录',
      getStarted: '开始使用',
      aiGenerator: 'AI生成器'
    },
    hero: {
      title: '将你的想法转化为惊艳的手办',
      subtitle: '使用我们先进的AI 3D模型生成技术，在几秒钟内创作出美丽、独特的手办模型',
      cta: '立即开始创作',
      learnMore: '了解更多',
      examplePrompt: '粉色头发的可爱动漫女孩手办',
    },
    what: {
      title: '什么是Nano Banana？',
      subtitle: '一个AI驱动的平台，将你的文字描述转化为惊艳的3D手办模型',
      feature1: {
        title: 'AI驱动生成',
        desc: '先进的人工智能在几秒钟内将你的文字描述转化为惊艳、独特的3D手办模型',
      },
      feature2: {
        title: '多种手办风格',
        desc: '选择动漫、写实、Q版、奇幻等数十种手办风格',
      },
      feature3: {
        title: '高质量3D模型',
        desc: '生成详细的3D模型，完美适用于3D打印、游戏和收藏品',
      },
      feature4: {
        title: '极速生成',
        desc: '在30秒内获得你的定制手办模型。无需等待，无延迟 - 即时创作',
      },
    },
    why: {
      title: '为什么选择Nano Banana？',
      subtitle: '体验3D手办创作的未来',
      reason1: {
        title: '隐私与安全',
        desc: '你的提示词和生成的3D模型完全私密。我们绝不会在未经许可的情况下存储或分享你的创意内容',
        stats: '隐私优先'
      },
      reason2: {
        title: '创作者信赖',
        desc: '加入超过50万名艺术家、设计师和创作者，他们都依赖Nano Banana进行手办项目',
        stats: '创作者信赖'
      },
      reason3: {
        title: '行业领先',
        desc: '我们的AI模型采用最新技术训练，相比其他平台提供卓越的3D模型质量',
        stats: '顶级质量'
      },
      reason4: {
        title: '持续改进',
        desc: '我们根据用户反馈和技术进步定期更新AI模型并添加新功能',
        stats: '始终进化'
      },
      stats: {
        uptime: '运行时间保证',
        support: '客户支持',
        images: '已生成手办',
        styles: '手办风格',
      },
    },
    how: {
      title: '如何使用',
      subtitle: '创作手办的三个简单步骤',
      step1: {
        title: '输入你的提示词',
        desc: '用简单的词汇描述你的手办愿景。尽可能创意和详细',
      },
      step2: {
        title: '选择你的风格',
        desc: '选择各种手办风格，如动漫、写实、Q版等',
      },
      step3: {
        title: '下载你的模型',
        desc: '获得令人惊艳的AI生成3D手办模型，随时可用于3D打印',
      },
    },
    stats: {
      images: '已创建手办',
      users: '活跃用户',
      uptime: '运行时间',
      support: '支持服务',
    },
    testimonials: {
      title: '用户评价',
      subtitle: '加入数千名满意的创作者，他们已经使用Nano Banana将想法转化为惊艳的手办模型。以下是他们Nano Banana体验的评价',
      user1: {
        name: '陈莎拉',
        role: '3D艺术家',
        text: 'Nano Banana彻底改变了我的创意工作流程。AI生成3D手办的质量绝对令人惊艳，可用的风格种类令人难以置信。我每天都在客户项目中使用它。',
      },
      user2: {
        name: '马库斯·罗德里格斯',
        role: '游戏开发者',
        text: '作为游戏开发者，我需要快速获得高质量3D模型。Nano Banana正是如此。速度和质量无与伦比，为我们团队节省了无数时间和预算。',
      },
      user3: {
        name: '艾米丽·沃森',
        role: '收藏家',
        text: '起初我对AI生成手办持怀疑态度，但Nano Banana完全改变了我的想法。模型如此详细和创意 - 有时甚至比我想象的更好。就像拥有一个个人雕塑师。',
      },
      user4: {
        name: '金大卫',
        role: '3D打印师',
        text: '对于3D打印和收藏品，Nano Banana是一个游戏改变者。多样的风格和快速迭代的能力显著加速了我的生产流程。强烈推荐！',
      },
      user5: {
        name: '丽莎·汤普森',
        role: '小企业主',
        text: '经营小企业，我需要价格实惠但专业的3D模型用于产品。Nano Banana正是如此。质量可以与昂贵的定制作品相媲美，但具有完全的定制性。',
      },
      user6: {
        name: '亚历克斯·约翰逊',
        role: '自由设计师',
        text: 'Nano Banana的创意可能性是无限的。我可以探索需要手动创建数小时的想法和概念。它已成为我设计工具库中的重要工具。',
      },
      stats: {
        averageRating: '平均评分',
        happyUsers: '满意用户',
        imagesGenerated: '已生成手办',
        satisfactionRate: '满意度',
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于Nano Banana你需要知道的一切',
      contact: '还有问题？我们随时为你提供帮助！',
      contactButton: '联系支持',
      q1: 'Nano Banana是如何工作的？',
      a1: 'Nano Banana使用先进的AI模型来解读你的文字描述并生成相应的3D手办模型。只需输入你想要创建的内容，选择你喜欢的风格，我们的AI就会在几秒钟内创建独特的3D模型。',
      q2: '我可以生成什么类型的手办？',
      a2: '你可以生成几乎任何类型的手办 - 从动漫角色到写实人物、Q版风格、奇幻生物、动物等等。我们的AI支持150多种不同的手办风格，可以处理复杂、详细的提示词。',
      q3: '我可以创建的手办数量有限制吗？',
      a3: '免费用户每天最多可以生成10个手办。高级订阅用户可以获得无限生成、优先处理和访问高级功能的权限，如更高细节级别和独家手办风格。',
      q4: '生成的3D模型质量如何？',
      a4: '免费用户获得标准质量的模型。高级用户可以生成高细节模型，完美适用于3D打印、游戏和专业用途。',
      q5: '我可以商业使用生成的手办吗？',
      a5: '是的！所有使用Nano Banana生成的手办都可以用于商业目的。你拥有创作的完全权利，包括销售、修改和分发它们的权利。',
      q6: '生成手办需要多长时间？',
      a6: '大多数手办在15-30秒内生成。高级用户享受优先处理，在高峰时段可以将生成时间缩短到仅10秒。',
      q7: 'Nano Banana与其他AI生成器有什么不同？',
      a7: 'Nano Banana专注于3D手办生成，注重质量、速度和用户体验。我们使用最新的AI模型，提供比竞争对手更多的手办风格，提供更好的提示词理解，并保持行业最高的3D模型质量标准。',
      q8: '我的数据安全私密吗？',
      a8: '绝对安全。我们认真对待隐私。你的提示词和生成的3D模型都经过加密，绝不会与第三方共享。你可以随时删除你的账户和所有相关数据。',
    },
    footer: {
      description: '使用Nano Banana的尖端AI技术，将你的想象力转化为惊艳的3D手办作品。通过简单的文字提示，创作、分享和发现令人惊叹的3D模型。',
      company: '公司',
      product: '产品',
      support: '支持',
      legal: '法律',
      copyright: '© 2025 Nano Banana. 保留所有权利。',
      madeWith: '为创作者用心制作 ❤️',
      poweredBy: 'AI驱动',
      about: '关于我们',
      careers: '招聘',
      press: '新闻',
      blog: '博客',
      features: '功能',
      pricing: '价格',
      api: 'API',
      help: '帮助中心',
      community: '社区',
      contact: '联系我们',
      terms: '服务条款',
      privacy: '隐私政策',
      cookies: 'Cookie政策',
      gdpr: 'GDPR',
      refundPolicy: '退款政策'
    },
    auth: {
      login: {
        title: '欢迎回来',
        subtitle: '登录您的账户',
        email: '电子邮件地址',
        password: '密码',
        forgotPassword: '忘记密码？',
        loginButton: '登录',
        loggingIn: '正在登录...',
        orContinueWith: '或继续使用',
        noAccount: "还没有账户？",
        signUp: '立即注册',
        error: '登录时发生错误'
      },
      signup: {
        title: '创建账户',
        subtitle: '开始您的AI创作之旅',
        email: '电子邮件地址',
        password: '密码',
        confirmPassword: '确认密码',
        createAccount: '创建账户',
        creating: '正在创建账户...',
        orContinueWith: '或继续使用',
        hasAccount: '已经有账户？',
        signIn: '立即登录',
        error: '注册时发生错误',
        passwordMismatch: '密码不匹配'
      },
      oauth: {
        error: 'OAuth登录失败'
      },
      forgotPassword: {
        title: '忘记密码',
        subtitle: '我们将发送重置链接到您的邮箱',
        email: '电子邮件地址',
        sendButton: '发送重置链接',
        sending: '正在发送...',
        backToLogin: '返回登录',
        successMessage: '密码重置链接已发送至您的邮箱',
        errorMessage: '发送重置链接时发生错误'
      }
    },
    privacy: {
      badge: '隐私保护',
      title: '隐私政策',
      lastUpdated: '最后更新：2025年8月',
      section1: {
        title: '信息收集',
        desc: '我们收集的信息类型以及如何使用这些信息来改善您的体验。',
        item1: '账户信息：用户名、邮箱地址和基本账户设置',
        item2: '使用数据：生成图像、使用功能和交互记录',
        item3: '技术信息：设备信息、浏览器类型和IP地址',
        item4: '支付信息：通过安全的第三方支付处理器处理'
      },
      section2: {
        title: '信息使用',
        desc: '我们如何使用收集的信息来提供和改进我们的服务。',
        item1: '提供和改进AI图像生成服务',
        item2: '个性化用户体验和推荐',
        item3: '处理支付和账户管理',
        item4: '发送服务更新和重要通知',
        item5: '确保服务安全和防止滥用'
      },
      section3: {
        title: '信息共享',
        desc: '我们不会出售、交易或转让您的个人信息给第三方，除非获得您的明确同意或法律要求。',
        item1: '仅在您同意的情况下与第三方共享',
        item2: '与法律要求相关的必要披露',
        item3: '保护我们权利和安全的必要措施',
        item4: '与可信服务提供商的有限共享'
      },
      section4: {
        title: '数据安全',
        desc: '我们采用行业标准的安全措施来保护您的个人信息。',
        item1: '使用SSL加密保护数据传输',
        item2: '定期安全审计和漏洞扫描',
        item3: '限制员工访问个人信息的权限',
        item4: '定期备份和灾难恢复计划'
      },
      section5: {
        title: '您的权利',
        desc: '您对个人信息享有的权利和控制选项。',
        item1: '访问和查看您的个人信息',
        item2: '更正或更新不准确的信息',
        item3: '删除您的账户和相关数据',
        item4: '选择退出营销通信'
      },
      section6: {
        title: '联系我们',
        desc: '如果您对我们的隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们。',
        email: 'privacy@nanobanana.com',
        response: '我们通常在24小时内回复您的询问'
      }
    },
    terms: {
      badge: '服务条款',
      title: '服务条款',
      lastUpdated: '最后更新：2025年8月',
      section1: {
        title: '服务描述',
        desc: 'Nano Banana提供AI驱动的图像生成服务，允许用户通过文字提示创建独特的艺术作品。我们的服务包括图像生成、存储和分享功能。'
      },
      section2: {
        title: '用户责任',
        desc: '使用我们的服务时，您需要遵守以下规定：',
        item1: '不得生成违法、有害或不当内容',
        item2: '不得侵犯他人知识产权或隐私权',
        item3: '不得滥用服务或进行恶意攻击',
        item4: '不得分享或传播有害内容',
        item5: '遵守所有适用的法律法规'
      },
      section3: {
        title: '知识产权',
        desc: '关于生成内容和平台使用的知识产权规定。',
        item1: '您拥有使用我们服务生成的图像',
        item2: '我们保留平台和技术的知识产权',
        item3: '不得复制或分发我们的专有技术',
        item4: '遵守第三方内容的使用许可',
        item5: '尊重原创内容的版权保护',
        item6: '不得将生成内容用于商业用途'
      },
      section4: {
        title: '服务限制',
        desc: '我们保留限制或终止服务的权利，包括但不限于：',
        item1: '违反服务条款的行为',
        item2: '恶意或滥用行为',
        item3: '技术问题或维护需求',
        item4: '法律或监管要求',
        item5: '超出合理使用范围的行为',
        item6: '影响其他用户体验的行为'
      },
      section5: {
        title: '免责声明',
        desc: '我们提供"按现状"的服务，不提供任何明示或暗示的保证。我们不对服务中断、数据丢失或任何直接或间接损失承担责任。',
        item1: '服务可能因技术问题而中断',
        item2: '生成内容的质量不保证',
        item3: '不承担因使用服务产生的损失',
        item4: '服务可能随时变更或终止'
      },
      section6: {
        title: '账户管理',
        desc: '关于账户创建、使用和终止的规定。',
        item1: '您必须提供真实有效的注册信息',
        item2: '您负责保护账户安全',
        item3: '我们可能暂停或终止违规账户',
        item4: '数据将在账户终止后被删除'
      },
      section7: {
        title: '争议解决',
        desc: '如发生争议，我们鼓励通过友好协商解决。如无法协商解决，争议将根据适用法律处理。'
      },
      section8: {
        title: '法律适用',
        desc: '本服务条款受中华人民共和国法律管辖，任何争议将提交有管辖权的人民法院解决。'
      },
      section9: {
        title: '联系我们',
        desc: '如果您对我们的服务条款有任何疑问或需要帮助，请通过以下方式联系我们。',
        email: 'legal@nanobanana.com',
        response: '我们通常在24小时内回复您的询问'
      },
      refundPolicy: {
        title: '退款政策',
        lastUpdated: '最后更新：2025年8月10日',
        section1: {
          title: '所有销售均为最终交易',
          desc: '由于数字服务的即时访问性质，一旦支付，所有订阅费用（包括月度/年度费用）均视为最终交易，不退还。这包括但不限于：未使用的订阅时间、账户使用不足、因个人原因取消订阅、服务功能符合描述但不符合用户预期。'
        },
        section2: {
          title: '订阅取消',
          desc: '当您取消订阅时：',
          items: [
            '取消仅停止未来的自动续费，不影响当前订阅周期',
            '您的积分和服务访问权限在当前计费周期结束前仍然有效',
            '与视频会员服务类似，您可以在订阅周期结束前继续使用'
          ]
        },
        section3: {
          title: '服务中断异常处理',
          desc: '在发生重大服务中断的情况下：',
          items: [
            '对于因非人为因素导致的持续超过72小时的服务中断，用户可以申请等额服务时间补偿',
            '这种补偿是唯一的补救措施，不涉及现金退款',
            '轻微中断或计划维护不构成补偿条件'
          ]
        },
        section4: {
          title: '争议解决',
          desc: '如果您对收费有任何疑问，请在7个工作日内联系我们：',
          items: [
            '联系media@nanobananamodle.com并提供交易ID',
            '提供支付凭证和问题描述',
            '我们将在15个工作日内调查并提供书面回复',
            '所有争议解决结果均为最终决定'
          ]
        },
        section5: {
          title: '政策修改权利',
          desc: 'nano-banana保留随时修改此政策的权利。修改后的政策将在网站上公开发布后立即生效。',
          highlights: [
            '您已完全理解和接受此政策',
            '您确认数字服务的特殊性质',
            '您同意放弃任何退款请求的权利'
          ]
        },
        section6: {
          title: '条款确认',
          desc: '通过支付订阅费用，您确认已阅读、理解和同意本退款政策中的所有条款。'
        },
        section7: {
          title: '联系信息',
          desc: '如果您对本政策或账单有任何疑问，请与我们联系：',
          email: 'media@nanobananamodle.com'
        }
      }
    },
    cta: {
      title: '准备好创作你的杰作了吗？',
      subtitle: '加入已经在使用Nano Banana的数千名艺术家和创作者',
      button: '立即开始',
      badge: '今天开始创作',
      pricing: '查看价格',
      stats: {
        images: '已创建图像',
        users: '活跃用户',
        uptime: '运行时间',
        support: '支持服务',
      },
      testimonials: {
        averageRating: '平均评分',
        happyUsers: '满意用户',
        imagesGenerated: '已生成图像',
        satisfactionRate: '满意度',
      },
    },
    gallery: {
      title: '手办画廊',
      subtitle: '探索我们社区使用Nano Banana AI技术创作的惊艳手办模型。获得灵感并创作你自己的杰作',
      loadMore: '加载更多作品',
      prompt: '提示词：',
      refresh: '刷新画廊',
      loginRequired: '请先登录以将手办添加到您的画廊',
      alreadyInGallery: '此手办已在您的画廊中',
      addedToGallery: '成功添加到您的画廊！',
      addFailed: '添加到画廊失败，请重试',
      removedFromGallery: '成功从您的画廊中移除',
      deleteImage: '删除图片',
      zoomImage: '放大查看',
      removeFailed: '从画廊移除失败，请重试',
      operationFailed: '操作失败，请重试',
      promptCopied: '提示词已复制到剪贴板！',
      copyFailed: '复制提示词失败，请重试',
      userGenerated: {
        badge: '用户创作',
        title: '用户AI生成手办',
        desc: '使用Nano Banana AI技术创建的独特手办模型',
        prompt: '您的创意提示',
        createdAt: '创建于'
      },
      image1: {
        title: '神秘精灵手办',
        desc: '一个充满发光翅膀和空灵美丽的魔法精灵手办',
      },
      image2: {
        title: '赛博朋克机器人手办',
        desc: '一个拥有霓虹细节和金属质感的未来机器人手办',
      },
      image3: {
        title: '海洋美人鱼手办',
        desc: '一个充满活力海洋色彩的宁静美人鱼手办',
      },
      image4: {
        title: '山龙手办',
        desc: '拥有戏剧性翅膀和鳞片的雄伟龙手办',
      },
      image5: {
        title: '太空探索者手办',
        desc: '一个拥有星系主题细节的惊艳宇航员手办',
      },
      image6: {
        title: '抽象艺术手办',
        desc: '充满流动艺术设计的 vibrant 抽象手办',
      },
      image7: {
        title: '野生动物手办',
        desc: '一个拥有详细毛发和特征的雄伟动物手办',
      },
      image8: {
        title: '建筑手办',
        desc: '拥有独特几何图案的现代建筑手办',
      },
      image9: {
        title: '复古汽车手办',
        desc: '怀旧风格中的经典复古汽车手办',
      },
      prompt1: '魔法精灵手办，发光翅膀，空灵美丽，奇幻风格',
      prompt2: '赛博朋克机器人手办，霓虹细节，金属质感，未来设计',
      prompt3: '美人鱼手办，海洋色彩，宁静美丽，水生主题',
      prompt4: '龙手办，雄伟翅膀，戏剧性鳞片，奇幻生物',
      prompt5: '宇航员手办，星系细节，太空探索者，宇宙主题',
      prompt6: '抽象手办，活力色彩，流动设计，艺术风格',
      prompt7: '动物手办，详细毛发，真实特征，野生动物主题',
      prompt8: '建筑手办，几何图案，现代建筑，城市设计',
      prompt9: '复古汽车手办，经典设计，怀旧风格，复古主题',
      // 新增图片的翻译
      image10: {
        title: '薄荷水',
        desc: '清新的薄荷水，展现自然之美'
      },
      prompt10: '清新的薄荷水，展现自然之美',
      image11: {
        title: '贝壳',
        desc: '美丽的贝壳，充满海洋魅力'
      },
      prompt11: '美丽的贝壳，充满海洋魅力',
      image12: {
        title: '茶杯',
        desc: '优雅的茶杯，传统韵味十足'
      },
      prompt12: '优雅的茶杯，传统韵味十足',
      image13: {
        title: '海浪',
        desc: '动态的海浪，展现自然力量'
      },
      prompt13: '动态的海浪，展现自然力量',
      image14: {
        title: '海鸥',
        desc: '优雅的海鸥，翱翔在海洋上空'
      },
      prompt14: '优雅的海鸥，翱翔在海洋上空',
      image15: {
        title: '荷叶',
        desc: '清新的荷叶，展现自然之美'
      },
      prompt15: '清新的荷叶，展现自然之美',
      image16: {
        title: '建筑',
        desc: '现代建筑，充满城市魅力'
      },
      prompt16: '现代建筑，充满城市魅力',
      image17: {
        title: '江南',
        desc: '传统江南水乡风光'
      },
      prompt17: '传统江南水乡风光',
      image18: {
        title: '旧巷子',
        desc: '怀旧的旧巷子，充满历史韵味'
      },
      prompt18: '怀旧的旧巷子，充满历史韵味',
      image19: {
        title: '橘子',
        desc: '新鲜的橘子，展现自然之美'
      },
      prompt19: '新鲜的橘子，展现自然之美',
      image20: {
        title: '蚂蚁',
        desc: '微小的蚂蚁，展现自然细节'
      },
      prompt20: '微小的蚂蚁，展现自然细节',
      image21: {
        title: '蜻蜓',
        desc: '优雅的蜻蜓，展现自然之美'
      },
      prompt21: '优雅的蜻蜓，展现自然之美',
      image22: {
        title: '蜻蜓眼睛',
        desc: '详细的蜻蜓眼睛，展现自然之美'
      },
      prompt22: '详细的蜻蜓眼睛，展现自然之美',
      image23: {
        title: '小蘑菇',
        desc: '可爱的小蘑菇，充满自然魅力'
      },
      prompt23: '可爱的小蘑菇，充满自然魅力'
    },
    draw: {
      prompt: '生成自提示词：',
      heroExamplePrompt: '粉色头发的可爱动漫女孩手办',
      title: 'AI手办生成器',
      subtitle: '使用我们先进的AI技术，将你的想法转化为惊艳的3D手办模型',
      promptPlaceholder: '描述你想要创建的手办...',
      styleLabel: '手办风格',
      sizeLabel: '模型尺寸',
      generateButton: '生成手办',
      generating: '生成中...',
      downloadButton: '下载',
      favoriteButton: '收藏',
      regenerateButton: '重新生成',
      successMessage: '手办生成成功！',
      errorMessage: '生成失败，请重试',
      waitingForGeneration: '等待生成',
      success: '成功',
      describeYourIdea: '描述你的手办创意',
      describeYourIdeaDesc: '详细描述你想要生成的手办内容',
      result: '生成结果',
      enterPromptAndClick: '输入提示词并点击生成按钮',
      styleRealistic: '🎭 写实风格 - 逼真的手办效果',
      styleAnime: '🎌 动漫风格 - 日式动漫手办',
      styleOilPainting: '🖼️ Q版风格 - 可爱的Q版手办',
      styleWatercolor: '💧 奇幻风格 - 奇幻生物手办',
      styleSketch: '✏️ 简约风格 - 极简手办设计',
      sizeSquare: '⬜ 小型',
      sizePortrait: '📱 中型',
      sizeLandscape: '🖥️ 大型',
      sizeWidescreen: '🎬 超大',
      sizeMobilePortrait: '📱 迷你',
      tip: '提示：描述越详细，生成的手办越符合你的想象',
      costCredits: '消耗 {credits} 积分',
      loginRequired: '请先登录',
      loginRequiredDesc: '登录后才能使用AI手办生成功能',
      cancel: '取消',
      goToLogin: '去登录',
      generatedImage: '生成的手办',
      generationFailed: '生成失败',
      insufficientCredits: '积分不足，请先充值',
      creditConsumeError: '积分消耗失败，请重试',
      addedToGallery: '手办已自动添加到您的画廊！',
      alreadyInGallery: '已存在于您的画廊中',
      addToGallery: '添加到画廊',
      removedFromGallery: '手办已从您的画廊中移除',
      operationFailed: '操作失败，请重试',
      // 新增提示信息
      addToGalleryHint: '点击爱心按钮添加到画廊',
      removeFromGalleryHint: '点击爱心按钮从画廊中移除',
      imageSaved: '手办已保存，点击爱心按钮展示到画廊',
      // 图片上传相关
      uploadImage: '上传参考图片',
      uploadImageDesc: '上传一张图片，基于此图片生成手办',
      clickToUpload: '点击上传图片',
      supportedFormats: '支持 JPG、PNG、WebP 格式（最大10MB）',
      optionalPrompt: '可选描述',
      imageRequired: '请上传一张图片',
      invalidFileType: '请上传有效的图片文件',
      fileTooLarge: '文件过大（最大10MB）',
      uploadTip: '上传清晰的参考图片以获得最佳效果',
    },
    about: {
      badge: '关于Nano Banana',
      title: '革新AI手办创作',
      subtitle: 'Nano Banana处于AI驱动3D创意的前沿，赋能艺术家、设计师和创作者，通过尖端人工智能技术将最狂野的想象力变为现实。',
      mission: {
        title: '我们的使命',
        desc: '通过让专业级AI 3D模型生成技术为每个人所用，实现手办创作的民主化。我们相信创意应该没有界限，技术应该放大人类想象力，而不是取代它。',
      },
      vision: {
        title: '我们的愿景',
        desc: '一个任何人都能在几秒钟内创作惊艳3D手办的世界，想法从脑海自由流向3D模型，AI成为人类表达和创新的终极创意伙伴。',
      },
      feature1: {
        title: '先进AI技术',
        desc: '由最先进的机器学习模型驱动，提供高质量、创意和独特的3D手办生成。',
      },
      feature2: {
        title: '以用户为中心的设计',
        desc: '为所有技能水平的创作者设计的直观界面，从初学者到专业3D艺术家和设计师。',
      },
      feature3: {
        title: '隐私与安全',
        desc: '企业级安全措施，保护您的创意作品，确保您的知识产权安全。',
      },
      stats: {
        images: '已创建手办',
        users: '活跃用户',
        uptime: '运行时间',
        support: '支持服务',
      },
      values: {
        title: '我们的价值观',
        subtitle: '这些核心原则指导我们在Nano Banana所做的一切',
        value1: {
          title: '卓越',
          desc: '我们在服务的每个方面都追求卓越，从AI质量到用户体验。',
        },
        value2: {
          title: '创意',
          desc: '我们庆祝和培养创意，相信它是人类进步的基础。',
        },
        value3: {
          title: '社区',
          desc: '我们建立并支持一个充满活力的创作者、艺术家和创新者社区。',
        },
      },
    },
    pricing: {
      title: '选择您的套餐',
      subtitle: '基于积分的灵活定价，每次手办生成仅需10积分',
      creditInfo: '每次AI手办生成消耗 10 积分',
      basic: '基础套餐',
      advanced: '进阶套餐',
      professional: '专业套餐',
      price: '价格',
      oneTime: '/ 一次性',
      credits: '积分',
      generations: '次生成',
      features: {
        basic: [
          '500 积分',
          '50 次AI手办生成',
          '基础模型质量',
          '标准客服支持',
          '7天退款保证'
        ],
        advanced: [
          '1000 积分',
          '100 次AI手办生成',
          '高清模型质量',
          '优先客服支持',
          '30天退款保证',
          '专属手办风格'
        ],
        professional: [
          '3000 积分',
          '300 次AI手办生成',
          '超高清模型质量',
          '24/7 专属客服',
          '90天退款保证',
          '专属手办风格',
          '批量生成功能',
          'API 访问权限'
        ]
      },
      popular: '最受欢迎',
      buyNow: '立即购买',
      whyChoose: '为什么选择我们的积分系统？',
      benefits: {
        flexible: {
          title: '灵活使用',
          desc: '积分永久有效，随时使用，不设时间限制'
        },
        transparent: {
          title: '透明定价',
          desc: '每次生成固定10积分，价格清晰明了'
        },
        value: {
          title: '高性价比',
          desc: '相比按次付费，积分套餐更经济实惠'
        }
      },
      contact: '还有疑问？联系我们获取更多信息',
      startCreating: '开始AI手办创作',
      contactSupport: '联系客服',
      loginRequired: '请登录继续',
      loginRequiredMessage: '您未登录，请先登录后再进行支付',
    },
    profile: {
      title: '个人资料',
      subtitle: '管理您的账户信息和查看使用统计',
      pleaseLogin: '请先登录',
      goToLogin: '去登录',
      loginRequired: '需要登录',
      loginToView: '请登录以查看您的个人资料',
      username: '用户名',
      userEmail: '用户邮箱',
      userPoints: '用户积分',
      freeAttempts: '免费尝试次数',
      verifiedUser: '已验证用户',
      accountSettings: '账户设置',
      startAICreation: '开始AI创作',
      startGenerating: '开始生成',
      viewGallery: '查看画廊',
      buyCredits: '购买积分',
      memberSince: '注册时间',
      aiGenerations: 'AI手办生成次数',
      usedThisMonth: '本月已使用',
      collectedWorks: '收藏手办',
      collectedWorksDesc: '已收藏手办',
      membershipLevel: '会员等级',
      advancedUser: '高级用户',
      premiumUser: '高级用户',
      creditsOverview: '积分概览',
      availableCredits: '可用积分',
      creditsDescription: '用于AI手办生成的积分',
      remainingGenerations: '剩余生成次数',
      creditsValue: '积分价值',
      buyMoreCredits: '购买更多积分',
      aiGenerationHistory: 'AI手办生成记录',
      imageGeneration: '手办生成',
      credits: '积分',
      noGenerationsYet: '还没有生成记录',
      // 新增翻译
      welcomeBack: '欢迎回来！',
      currentCredits: '当前积分',
      totalEarned: '累计获得',
      totalSpent: '累计消费',
      transactionHistory: '交易记录',
      consumption: '消费',
      recharge: '充值',
      generationResult: '生成结果',
      creditRecharge: '积分充值',
      packagePurchase: '套餐购买',
      noTransactionRecords: '暂无交易记录',
      purchaseCredits: '购买积分',
      // 套餐相关翻译
      basicPackage: '基础套餐',
      advancedPackage: '进阶套餐',
      professionalPackage: '专业套餐',
      rechargePoints: '充值积分',
      // 新用户赠送积分翻译
      newUserGift: '新用户赠送积分',
      // 赠送类型翻译
      gift: '赠送'
    },
    // 悬浮球支持翻译
    floating_support: {
      title: '需要帮助？',
      message: '如果您在使用过程中遇到任何问题，请通过邮件联系我们，我们会尽快帮您解决！',
      close: '关闭',
      customer_service_email: '客服邮箱',
      click_to_send: '点击发送邮件',
      response_time: '我们通常在24小时内回复'
    },
    caseStudy: {
      title: '一个设计，一套手办',
      subtitle: '同一张人物图片可以生成一套完整的手办系列，包含多种风格和姿态',
      originalTitle: '原始人物设计',
      originalDesc: '输入的人物参考图片',
      conclusion: {
        title: '🎨 一套手办，多种可能',
        desc: '通过AI技术，您可以将任何人物图片转换为一套完整的手办系列。无论是动漫、写实、奇幻还是机甲风格，都能生成配套的手办收藏品，让您的创意想法变成现实的手办系列。'
      }
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'zh'>('en'); // 默认英文，避免水合错误
  
  // 在客户端挂载后从localStorage读取语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nano-banana-language');
    if (savedLanguage === 'zh' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);


  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 如果找不到翻译，返回原始键
      }
    }
    
    return value || key;
  };

  const handleSetLanguage = (lang: 'en' | 'zh') => {
    setLanguage(lang);
    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('nano-banana-language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

