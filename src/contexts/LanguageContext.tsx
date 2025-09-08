"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'zh' | 'zh-tw';
  setLanguage: (lang: 'en' | 'zh' | 'zh-tw') => void;
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
      title: '将你的想法转化为惊艳的AI  公仔  | 专业3D  公仔 创作平台',
      subtitle: '使用我们先进的AI 公仔生成技术，在几秒钟内创作出美丽、独特的3D 公仔 模型。Nano Banana是专业的AI 公仔生成器，支持多种 公仔 风格创作。每个 公仔 都是独特的艺术品，让 公仔 创作变得简单高效。',
      cta: '立即开始AI 公仔创作',
      learnMore: '了解更多 公仔 创作技巧',
      examplePrompt: '粉色头发的可爱动漫女孩 公仔 ',
    },
    what: {
      title: '什么是Nano Banana AI 公仔生成器？',
      subtitle: 'Nano Banana是专业的AI 公仔创作平台，将你的文字描述转化为惊艳的3D 公仔 模型。我们的AI 公仔生成器支持多种 公仔 风格，是创作者的首选 公仔 制作工具。每个 公仔 都经过精心设计，让 公仔 创作变得简单高效。',
      feature1: {
        title: 'AI公仔驱动生成',
        desc: '先进的人工智能在几秒钟内将你的文字描述转化为惊艳、独特的3D公仔模型。我们的AI公仔生成技术确保每个公仔都是独一无二的艺术作品。',
      },
      feature2: {
        title: '多种AI 公仔风格',
        desc: '选择动漫 公仔 、写实 公仔 、Q版 公仔 、奇幻 公仔 等数十种 公仔 风格。每个 公仔 都经过AI精心设计，满足不同创作者的 公仔 需求。 公仔 创作从未如此简单，让每个 公仔 都成为艺术品。',
      },
      feature3: {
        title: '高质量3D 公仔 模型',
        desc: '生成详细的3D 公仔 模型，完美适用于3D打印、游戏和收藏品。我们的AI 公仔生成器确保每个 公仔 都具备专业级的质量。每个 公仔 都是精心制作的艺术品，让 公仔 收藏变得更有价值。',
      },
      feature4: {
        title: '极速AI 公仔生成',
        desc: '在30秒内获得你的定制AI 公仔模型。无需等待，无延迟 - 即时 公仔 创作体验。让AI 公仔生成变得简单高效。',
      },
    },
    why: {
      title: '为什么选择Nano Banana AI 公仔生成器？',
      subtitle: '体验AI 公仔创作的未来，专业3D 公仔 制作平台。每个 公仔 都是独特的艺术品，让 公仔 创作变得简单高效。',
      reason1: {
        title: 'AI 公仔隐私与安全',
        desc: '你的AI 公仔提示词和生成的3D 公仔 模型完全私密。我们绝不会在未经许可的情况下存储或分享你的 公仔 创意内容。每个 公仔 都是你的专属艺术品， 公仔 创作完全私密。',
        stats: ' 公仔 隐私优先'
      },
      reason2: {
        title: ' 公仔 创作者信赖',
        desc: '加入超过50万名艺术家、设计师和创作者，他们都依赖Nano Banana进行AI 公仔项目创作。我们的AI 公仔生成器是创作者的首选工具。每个 公仔 都经过精心设计，让 公仔 创作变得专业高效。',
        stats: ' 公仔 创作者信赖'
      },
      reason3: {
        title: 'AI 公仔行业领先',
        desc: '我们的AI 公仔模型采用最新技术训练，相比其他平台提供卓越的3D 公仔 质量。每个AI 公仔都经过精心优化。每个 公仔 都是高质量的艺术品，让 公仔 创作达到专业水准。',
        stats: 'AI 公仔顶级质量'
      },
      reason4: {
        title: 'AI 公仔持续改进',
        desc: '我们根据用户反馈和技术进步定期更新AI 公仔模型并添加新功能。让AI 公仔生成技术始终保持领先。每个 公仔 都采用最新技术制作，让 公仔 创作体验持续提升。',
        stats: 'AI 公仔始终进化'
      },
      stats: {
        uptime: 'AI 公仔运行时间保证',
        support: ' 公仔 创作客户支持',
        images: '已生成AI 公仔',
        styles: 'AI 公仔风格',
      },
    },
    how: {
      title: '如何使用AI 公仔生成器',
      subtitle: '创作AI 公仔的三个简单步骤，专业3D 公仔 制作流程',
      step1: {
        title: '输入你的AI 公仔提示词',
        desc: '用简单的词汇描述你的AI 公仔愿景。尽可能创意和详细，让AI 公仔生成器理解你的 公仔 创作需求',
      },
      step2: {
        title: '选择你的AI 公仔风格',
        desc: '选择各种AI 公仔风格，如动漫 公仔 、写实 公仔 、Q版 公仔 等。我们的AI 公仔生成器支持多种 公仔 风格',
      },
      step3: {
        title: '下载你的AI 公仔模型',
        desc: '获得令人惊艳的AI生成3D 公仔 模型，随时可用于3D打印。每个AI 公仔都是独特的艺术作品',
      },
    },
    stats: {
      images: '已创建 公仔 ',
      users: '活跃用户',
      uptime: '运行时间',
      support: '支持服务',
    },
    testimonials: {
      title: '用户评价',
      subtitle: '加入数千名满意的创作者，他们已经使用Nano Banana将想法转化为惊艳的 公仔 模型。以下是他们Nano Banana体验的评价',
      user1: {
        name: '陈莎拉',
        role: '3D艺术家',
        text: 'Nano Banana彻底改变了我的创意工作流程。AI生成3D 公仔 的质量绝对令人惊艳，可用的风格种类令人难以置信。我每天都在客户项目中使用它。',
      },
      user2: {
        name: '马库斯·罗德里格斯',
        role: '游戏开发者',
        text: '作为游戏开发者，我需要快速获得高质量3D模型。Nano Banana正是如此。速度和质量无与伦比，为我们团队节省了无数时间和预算。',
      },
      user3: {
        name: '艾米丽·沃森',
        role: '收藏家',
        text: '起初我对AI生成 公仔 持怀疑态度，但Nano Banana完全改变了我的想法。模型如此详细和创意 - 有时甚至比我想象的更好。就像拥有一个个人雕塑师。',
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
        imagesGenerated: '已生成 公仔 ',
        satisfactionRate: '满意度',
      },
    },
    faq: {
      title: 'AI 公仔生成器常见问题',
      subtitle: '关于Nano Banana AI 公仔生成器你需要知道的一切',
      contact: '还有AI 公仔创作问题？我们随时为你提供帮助！',
      contactButton: '联系AI 公仔支持',
      q1: 'Nano Banana AI 公仔生成器是如何工作的？',
      a1: 'Nano Banana AI 公仔生成器使用先进的AI模型来解读你的文字描述并生成相应的3D 公仔 模型。只需输入你想要创建的AI 公仔内容，选择你喜欢的 公仔 风格，我们的AI 公仔生成器就会在几秒钟内创建独特的3D 公仔 模型。',
      q2: '我可以生成什么类型的AI 公仔？',
      a2: '你可以生成几乎任何类型的AI 公仔 - 从动漫 公仔 角色到写实 公仔 人物、Q版 公仔 风格、奇幻 公仔 生物、动物 公仔 等等。我们的AI 公仔生成器支持150多种不同的 公仔 风格，可以处理复杂、详细的AI 公仔提示词。',
      q3: '我可以创建的AI 公仔数量有限制吗？',
      a3: '免费用户每天最多可以生成10个AI 公仔。高级订阅用户可以获得无限AI 公仔生成、优先处理和访问高级功能的权限，如更高细节级别和独家AI 公仔风格。',
      q4: '生成的AI 公仔3D模型质量如何？',
      a4: '免费用户获得标准质量的AI 公仔模型。高级用户可以生成高细节AI 公仔模型，完美适用于3D打印、游戏和专业用途。每个AI 公仔都经过精心优化。',
      q5: '我可以商业使用生成的AI 公仔吗？',
      a5: '是的！所有使用Nano Banana AI 公仔生成器生成的 公仔 都可以用于商业目的。你拥有AI 公仔创作的完全权利，包括销售、修改和分发AI 公仔的权利。',
      q6: '生成AI 公仔需要多长时间？',
      a6: '大多数AI 公仔在15-30秒内生成。高级用户享受优先处理，在高峰时段可以将AI 公仔生成时间缩短到仅10秒。让AI 公仔创作变得高效便捷。',
      q7: 'Nano Banana AI 公仔生成器与其他AI生成器有什么不同？',
      a7: 'Nano Banana AI 公仔生成器专注于3D 公仔 生成，注重AI 公仔质量、速度和用户体验。我们使用最新的AI 公仔模型，提供比竞争对手更多的 公仔 风格，提供更好的AI 公仔提示词理解，并保持行业最高的3D 公仔 模型质量标准。',
      q8: '我的AI 公仔数据安全私密吗？',
      a8: '绝对安全。我们认真对待AI 公仔隐私。你的AI 公仔提示词和生成的3D 公仔 模型都经过加密，绝不会与第三方共享。你可以随时删除你的账户和所有相关AI 公仔数据。',
    },
    footer: {
      description: '使用Nano Banana的尖端AI 公仔生成技术，将你的想象力转化为惊艳的3D 公仔 作品。通过简单的文字提示，创作、分享和发现令人惊叹的AI 公仔模型。专业AI 公仔创作平台，让每个 公仔 都成为艺术品。',
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
      title: 'AI 公仔画廊 | 专业3D 公仔 作品展示',
      subtitle: '探索我们社区使用Nano Banana AI 公仔生成器创作的惊艳AI 公仔模型。获得AI 公仔创作灵感并创作你自己的 公仔 杰作。每个AI 公仔都是独特的艺术品。',
      loadMore: '加载更多作品',
      prompt: '提示词：',
      refresh: '刷新画廊',
      loginRequired: '请先登录以将AI 公仔添加到您的 公仔 画廊',
      alreadyInGallery: '此AI 公仔已在您的 公仔 画廊中',
      addedToGallery: 'AI 公仔成功添加到您的 公仔 画廊！',
      addFailed: 'AI 公仔添加到画廊失败，请重试',
      removedFromGallery: 'AI 公仔成功从您的 公仔 画廊中移除',
      deleteImage: '删除AI 公仔图片',
      zoomImage: '放大查看AI 公仔',
      removeFailed: '从 公仔 画廊移除AI 公仔失败，请重试',
      operationFailed: 'AI 公仔操作失败，请重试',
      promptCopied: 'AI 公仔提示词已复制到剪贴板！',
      copyFailed: '复制AI 公仔提示词失败，请重试',
      userGenerated: {
        badge: '用户AI 公仔创作',
        title: '用户AI 公仔生成作品',
        desc: '使用Nano Banana AI 公仔生成器创建的独特AI 公仔模型',
        prompt: '您的AI 公仔创意提示',
        createdAt: 'AI 公仔创建于'
      },
      image1: {
        title: '神秘精灵 公仔 ',
        desc: '一个充满发光翅膀和空灵美丽的魔法精灵 公仔 ',
      },
      image2: {
        title: '赛博朋克机器人 公仔 ',
        desc: '一个拥有霓虹细节和金属质感的未来机器人 公仔 ',
      },
      image3: {
        title: '海洋美人鱼 公仔 ',
        desc: '一个充满活力海洋色彩的宁静美人鱼 公仔 ',
      },
      image4: {
        title: '山龙 公仔 ',
        desc: '拥有戏剧性翅膀和鳞片的雄伟龙 公仔 ',
      },
      image5: {
        title: '太空探索者 公仔 ',
        desc: '一个拥有星系主题细节的惊艳宇航员 公仔 ',
      },
      image6: {
        title: '抽象艺术 公仔 ',
        desc: '充满流动艺术设计的 vibrant 抽象 公仔 ',
      },
      image7: {
        title: '野生动物 公仔 ',
        desc: '一个拥有详细毛发和特征的雄伟动物 公仔 ',
      },
      image8: {
        title: '建筑 公仔 ',
        desc: '拥有独特几何图案的现代建筑 公仔 ',
      },
      image9: {
        title: '复古汽车 公仔 ',
        desc: '怀旧风格中的经典复古汽车 公仔 ',
      },
      prompt1: '魔法精灵 公仔 ，发光翅膀，空灵美丽，奇幻风格',
      prompt2: '赛博朋克机器人 公仔 ，霓虹细节，金属质感，未来设计',
      prompt3: '美人鱼 公仔 ，海洋色彩，宁静美丽，水生主题',
      prompt4: '龙 公仔 ，雄伟翅膀，戏剧性鳞片，奇幻生物',
      prompt5: '宇航员 公仔 ，星系细节，太空探索者，宇宙主题',
      prompt6: '抽象 公仔 ，活力色彩，流动设计，艺术风格',
      prompt7: '动物 公仔 ，详细毛发，真实特征，野生动物主题',
      prompt8: '建筑 公仔 ，几何图案，现代建筑，城市设计',
      prompt9: '复古汽车 公仔 ，经典设计，怀旧风格，复古主题',
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
      prompt: 'AI 公仔生成自提示词：',
      heroExamplePrompt: '粉色头发的可爱动漫女孩AI 公仔',
      title: '专业AI 公仔生成器 | 3D 公仔 创作工具',
      subtitle: '使用我们先进的AI 公仔生成技术，将你的想法转化为惊艳的3D 公仔 模型。专业AI 公仔创作平台，让每个 公仔 都成为艺术品。',
      promptPlaceholder: '描述你想要创建的AI 公仔...',
      styleLabel: 'AI 公仔风格',
      sizeLabel: 'AI 公仔模型尺寸',
      generateButton: '生成AI 公仔',
      generating: 'AI 公仔生成中...',
      downloadButton: '下载AI 公仔',
      favoriteButton: '收藏AI 公仔',
      regenerateButton: '重新生成AI 公仔',
      successMessage: 'AI 公仔生成成功！',
      errorMessage: 'AI 公仔生成失败，请重试',
      waitingForGeneration: '等待AI 公仔生成',
      success: 'AI 公仔生成成功',
      describeYourIdea: '描述你的AI 公仔创意',
      describeYourIdeaDesc: '详细描述你想要生成的AI 公仔内容，让AI 公仔生成器理解你的创作需求',
      result: 'AI 公仔生成结果',
      enterPromptAndClick: '输入AI 公仔提示词并点击生成按钮',
      styleRealistic: '🎭 写实风格 - 逼真的AI 公仔效果',
      styleAnime: '🎌 动漫风格 - 日式动漫AI 公仔',
      styleOilPainting: '🖼️ Q版风格 - 可爱的Q版AI 公仔',
      styleWatercolor: '💧 奇幻风格 - 奇幻生物AI 公仔',
      styleSketch: '✏️ 简约风格 - 极简AI 公仔设计',
      sizeSquare: '⬜ 小型',
      sizePortrait: '📱 中型',
      sizeLandscape: '🖥️ 大型',
      sizeWidescreen: '🎬 超大',
      sizeMobilePortrait: '📱 迷你',
      tip: '提示：描述越详细，生成的AI 公仔越符合你的想象。让AI 公仔生成器理解你的创作需求。',
      costCredits: 'AI 公仔生成消耗 {credits} 积分',
      loginRequired: '请先登录',
      loginRequiredDesc: '登录后才能使用AI 公仔生成功能，开始你的AI 公仔创作之旅',
      cancel: '取消AI 公仔生成',
      goToLogin: '去登录',
      generatedImage: '生成的AI 公仔',
      generationFailed: 'AI 公仔生成失败',
      insufficientCredits: '积分不足，请先充值',
      creditConsumeError: 'AI 公仔生成积分消耗失败，请重试',
      addedToGallery: 'AI 公仔已自动添加到您的 公仔 画廊！',
      alreadyInGallery: '此AI 公仔已存在于您的 公仔 画廊中',
      addToGallery: '添加AI 公仔到画廊',
      removedFromGallery: 'AI 公仔已从您的 公仔 画廊中移除',
      operationFailed: 'AI 公仔操作失败，请重试',
      // 新增提示信息
      addToGalleryHint: '点击爱心按钮添加AI 公仔到画廊',
      removeFromGalleryHint: '点击爱心按钮从 公仔 画廊中移除AI 公仔',
      imageSaved: 'AI 公仔已保存，点击爱心按钮展示到 公仔 画廊',
      // 图片上传相关
      uploadImage: '上传AI 公仔参考图片',
      uploadImageDesc: '上传一张图片，基于此图片生成AI 公仔',
      clickToUpload: '点击上传AI 公仔参考图片',
      supportedFormats: '支持 JPG、PNG、WebP 格式（最大10MB）',
      optionalPrompt: 'AI 公仔可选描述',
      imageRequired: '请上传一张AI 公仔参考图片',
      invalidFileType: '请上传有效的AI 公仔图片文件',
      fileTooLarge: 'AI 公仔文件过大（最大10MB）',
      uploadTip: '上传清晰的AI 公仔参考图片以获得最佳效果',
    },
    about: {
      badge: '关于Nano Banana AI 公仔生成器',
      title: '革新AI 公仔创作 | 专业3D 公仔 制作平台',
      subtitle: 'Nano Banana AI 公仔生成器处于AI驱动3D 公仔 创意的前沿，赋能艺术家、设计师和创作者，通过尖端人工智能技术将最狂野的想象力变为现实的AI 公仔作品。',
      mission: {
        title: '我们的AI 公仔使命',
        desc: '通过让专业级AI 3D 公仔 模型生成技术为每个人所用，实现AI 公仔创作的民主化。我们相信AI 公仔创意应该没有界限，技术应该放大人类想象力，让每个 公仔 都成为艺术品。',
      },
      vision: {
        title: '我们的AI 公仔愿景',
        desc: '一个任何人都能在几秒钟内创作惊艳3D AI 公仔的世界，想法从脑海自由流向3D 公仔 模型，AI 公仔生成器成为人类表达和创新的终极创意伙伴。',
      },
      feature1: {
        title: '先进AI 公仔技术',
        desc: '由最先进的机器学习模型驱动，提供高质量、创意和独特的3D AI 公仔生成。每个AI 公仔都经过精心优化。',
      },
      feature2: {
        title: '以用户为中心的AI 公仔设计',
        desc: '为所有技能水平的AI 公仔创作者设计的直观界面，从初学者到专业3D 公仔 艺术家和设计师。',
      },
      feature3: {
        title: 'AI 公仔隐私与安全',
        desc: '企业级安全措施，保护您的AI 公仔创意作品，确保您的AI 公仔知识产权安全。',
      },
      stats: {
        images: '已创建AI 公仔',
        users: 'AI 公仔活跃用户',
        uptime: 'AI 公仔运行时间',
        support: 'AI 公仔支持服务',
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
      title: '选择您的AI 公仔套餐',
      subtitle: '基于积分的灵活定价，每次AI 公仔生成仅需10积分。专业AI 公仔创作平台，让每个 公仔 都成为艺术品。',
      creditInfo: '每次AI 公仔生成消耗 10 积分，专业3D 公仔 制作服务',
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
          '50 次AI 公仔生成',
          '基础AI 公仔模型质量',
          '标准AI 公仔客服支持',
          '7天AI 公仔退款保证'
        ],
        advanced: [
          '1000 积分',
          '100 次AI 公仔生成',
          '高清AI 公仔模型质量',
          '优先AI 公仔客服支持',
          '30天AI 公仔退款保证',
          '专属AI 公仔风格'
        ],
        professional: [
          '3000 积分',
          '300 次AI 公仔生成',
          '超高清AI 公仔模型质量',
          '24/7 专属AI 公仔客服',
          '90天AI 公仔退款保证',
          '专属AI 公仔风格',
          '批量AI 公仔生成功能',
          'AI 公仔API 访问权限'
        ]
      },
      popular: '最受欢迎',
      buyNow: '立即购买',
      whyChoose: '为什么选择我们的AI 公仔积分系统？',
      benefits: {
        flexible: {
          title: 'AI 公仔灵活使用',
          desc: 'AI 公仔积分永久有效，随时使用，不设时间限制'
        },
        transparent: {
          title: 'AI 公仔透明定价',
          desc: '每次AI 公仔生成固定10积分，价格清晰明了'
        },
        value: {
          title: 'AI 公仔高性价比',
          desc: '相比按次付费，AI 公仔积分套餐更经济实惠'
        }
      },
      contact: '还有AI 公仔疑问？联系我们获取更多信息',
      startCreating: '开始AI 公仔创作',
      contactSupport: '联系AI 公仔客服',
      loginRequired: '请登录继续',
      loginRequiredMessage: '您未登录，请先登录后再进行AI 公仔支付',
    },
    profile: {
      title: 'AI 公仔个人资料',
      subtitle: '管理您的AI 公仔账户信息和查看AI 公仔使用统计',
      pleaseLogin: '请先登录',
      goToLogin: '去登录',
      loginRequired: '需要登录',
      loginToView: '请登录以查看您的AI 公仔个人资料',
      username: 'AI 公仔用户名',
      userEmail: 'AI 公仔用户邮箱',
      userPoints: 'AI 公仔用户积分',
      freeAttempts: 'AI 公仔免费尝试次数',
      verifiedUser: '已验证AI 公仔用户',
      accountSettings: 'AI 公仔账户设置',
      startAICreation: '开始AI 公仔创作',
      startGenerating: '开始AI 公仔生成',
      viewGallery: '查看AI 公仔画廊',
      buyCredits: '购买AI 公仔积分',
      memberSince: 'AI 公仔注册时间',
      aiGenerations: 'AI 公仔生成次数',
      usedThisMonth: '本月AI 公仔已使用',
      collectedWorks: '收藏AI 公仔',
      collectedWorksDesc: '已收藏AI 公仔',
      membershipLevel: 'AI 公仔会员等级',
      advancedUser: 'AI 公仔高级用户',
      premiumUser: 'AI 公仔高级用户',
      creditsOverview: 'AI 公仔积分概览',
      availableCredits: 'AI 公仔可用积分',
      creditsDescription: '用于AI 公仔生成的积分',
      remainingGenerations: 'AI 公仔剩余生成次数',
      creditsValue: 'AI 公仔积分价值',
      buyMoreCredits: '购买更多AI 公仔积分',
      aiGenerationHistory: 'AI 公仔生成记录',
      imageGeneration: 'AI 公仔生成',
      credits: 'AI 公仔积分',
      noGenerationsYet: '还没有AI 公仔生成记录',
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
      title: '一个设计，一套AI 公仔',
      subtitle: '同一张人物图片可以生成一套完整的AI 公仔系列，包含多种AI 公仔风格和姿态',
      originalTitle: '原始AI 公仔人物设计',
      originalDesc: '输入的AI 公仔人物参考图片',
      conclusion: {
        title: '🎨 一套AI 公仔，多种可能',
        desc: '通过AI 公仔生成技术，您可以将任何人物图片转换为一套完整的AI 公仔系列。无论是动漫 公仔 、写实 公仔 、奇幻 公仔 还是机甲 公仔 风格，都能生成配套的AI 公仔收藏品，让您的创意想法变成现实的AI 公仔系列。'
      }
    },
    aiFigurine: {
      title: '生成AI公仔 - 让想象变为现实',
      subtitle: '使用最先进的AI技术，将您的创意想法转化为精美的3D公仔模型。无论是动漫角色、游戏人物还是原创设计，都能在几秒钟内生成独一无二的AI公仔。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '立即开始制作您的AI公仔',
      keywords: {
        aiFigurine: 'AI公仔生成',
        d3dFigurine: '3D公仔制作',
        aiModeling: '人工智能建模',
        smartDesign: '智能公仔设计',
        aiHandmade: 'AI手办制作',
        digitalFigurine: '数字公仔生成',
        mlModeling: '机器学习建模',
        smart3dPrint: '智能3D打印'
      },
      examples: {
        anime: {
          title: '动漫风格公仔',
          desc: '精美的动漫风格AI公仔，细节丰富，色彩鲜艳'
        },
        realistic: {
          title: '写实风格公仔',
          desc: '逼真的写实风格AI公仔，质感细腻，栩栩如生'
        },
        qversion: {
          title: 'Q版可爱公仔',
          desc: '萌趣的Q版AI公仔，造型可爱，充满童趣'
        }
      },
      sections: {
        whatIs: {
          title: '什么是AI公仔生成？',
          desc1: 'AI公仔生成是一种革命性的技术，它利用人工智能和机器学习算法，将文字描述或图片输入转化为精美的3D公仔模型。这项技术结合了计算机视觉、自然语言处理和3D建模技术，能够在极短的时间内创造出独特、个性化的公仔设计。通过AI智能建模、深度学习算法和自动化设计，用户可以轻松实现从创意到成品的快速转换。',
          desc2: '通过AI公仔生成技术，用户可以轻松创建各种风格的公仔，包括动漫风格、写实风格、卡通风格、科幻风格等。无论是想要一个可爱的宠物公仔、一个酷炫的超级英雄公仔，还是一个充满创意的原创角色公仔，AI都能根据您的描述快速生成符合要求的3D模型。这种智能公仔制作技术为数字雕塑、虚拟手办、AI手办制作等领域带来了全新的可能性。'
        },
        advantages: {
          title: 'AI公仔生成的技术优势',
          smart: '智能理解',
          smartDesc: 'AI能够准确理解您的文字描述，捕捉每一个细节要求',
          fast: '快速生成',
          fastDesc: '几秒钟内就能生成完整的3D公仔模型，无需等待',
          quality: '高质量输出',
          qualityDesc: '生成的公仔模型具有高精度和丰富的细节表现',
          creative: '无限创意',
          creativeDesc: '支持各种创意风格，让您的想象力得到充分释放'
        },
        applications: {
          title: 'AI公仔生成的应用场景',
          personal: '个人收藏',
          personalDesc: '创建独特的个人收藏公仔，展现个人品味和喜好',
          commercial: '商业用途',
          commercialDesc: '为游戏、动漫、影视作品设计角色公仔，提升品牌价值',
          education: '教育学习',
          educationDesc: '帮助学生理解3D建模概念，培养创意思维能力',
          gift: '礼品定制',
          giftDesc: '为亲朋好友定制专属公仔，表达心意和关怀'
        },
        howToUse: {
          title: '如何使用AI公仔生成？',
          step1: '上传图片或输入描述',
          step1Desc: '上传您想要制作成公仔的图片，或者用文字详细描述您想要的公仔外观',
          step2: '选择风格和参数',
          step2Desc: '选择公仔的风格类型、尺寸大小、颜色偏好等参数设置',
          step3: 'AI智能生成',
          step3Desc: 'AI系统自动分析您的输入，生成符合要求的3D公仔模型',
          step4: '下载和分享',
          step4Desc: '预览生成的公仔模型，满意后下载3D文件或分享给朋友'
        },
        future: {
          title: 'AI公仔生成的未来展望',
          desc1: '随着人工智能技术的不断发展，AI公仔生成将变得更加智能化和个性化。未来的AI公仔生成系统将能够更好地理解用户的情感需求，生成更加符合用户期望的公仔设计。同时，随着3D打印技术的普及，用户将能够轻松地将AI生成的公仔模型转化为真实的实体公仔。',
          desc2: '此外，AI公仔生成技术还将与虚拟现实、增强现实等技术结合，为用户提供更加沉浸式的体验。用户将能够在虚拟世界中与AI生成的公仔进行互动，甚至可以通过手势控制来调整公仔的外观和动作。',
          desc3: '总的来说，AI公仔生成技术为创意产业带来了新的机遇和挑战。它不仅降低了3D建模的门槛，让更多人能够参与到创意设计中来，同时也为传统的手办制作、游戏开发、影视制作等行业提供了新的工具和可能性。'
        }
      }
    },
    generateFigurine: {
      title: '生成公仔 - 创意无限，一键实现',
      subtitle: '通过先进的AI技术，将您的创意想法转化为精美的3D公仔模型。无论是动漫角色、游戏人物还是原创设计，都能在几秒钟内生成独一无二的公仔作品。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '立即开始生成您的专属公仔',
      keywords: {
        generator: '公仔生成器',
        d3dModel: '3D模型制作',
        digitalSculpture: '数字雕塑',
        virtualFigurine: '虚拟公仔',
        customFigurine: '公仔定制',
        smartModeling: '智能建模',
        creativeFigurine: '创意公仔',
        designSoftware: '公仔设计软件'
      },
      examples: {
        scifi: {
          title: '科幻风格公仔',
          desc: '未来感十足的科幻风格公仔，设计前卫，细节精致'
        },
        fantasy: {
          title: '奇幻风格公仔',
          desc: '充满魔幻色彩的奇幻风格公仔，造型独特，富有想象力'
        },
        retro: {
          title: '复古风格公仔',
          desc: '怀旧复古风格公仔，充满年代感，设计经典'
        }
      },
      sections: {
        technology: {
          title: '公仔生成技术详解',
          desc1: '公仔生成技术是一种结合了人工智能、计算机视觉和3D建模的先进技术。它能够根据用户的输入（文字描述或图片）自动生成高质量的3D公仔模型。这项技术的核心在于深度学习和神经网络算法，能够理解和分析复杂的视觉信息，并将其转化为精确的3D几何结构。通过智能建模系统、数字雕塑技术和虚拟公仔制作，用户可以轻松实现创意公仔的快速生成。',
          desc2: '现代的公仔生成系统通常采用生成对抗网络（GAN）和变分自编码器（VAE）等先进的机器学习模型。这些模型经过大量3D模型数据的训练，能够学习到不同风格、不同主题公仔的特征模式，从而生成符合用户需求的个性化公仔设计。这种公仔定制技术、智能建模算法和创意公仔设计系统为公仔制作行业带来了革命性的变化。',
          desc3: '公仔生成技术的优势在于其高度的自动化和智能化。用户无需具备专业的3D建模技能，只需要提供简单的描述或参考图片，系统就能自动生成复杂的3D模型。这不仅大大降低了创作门槛，也大大提高了创作效率，让更多人能够参与到创意设计中来。通过公仔设计软件、智能建模工具和数字雕塑平台，用户可以轻松实现从概念到成品的完整创作流程。'
        },
        coreFeatures: {
          title: '公仔生成的核心功能',
          smartRecognition: {
            title: '智能识别',
            desc: '自动识别图片中的关键特征，准确提取公仔设计元素'
          },
          preciseModeling: {
            title: '精准建模',
            desc: '基于输入信息生成高精度的3D几何模型'
          },
          styleTransfer: {
            title: '风格转换',
            desc: '支持多种艺术风格的转换，满足不同审美需求'
          },
          multiFormat: {
            title: '多格式输出',
            desc: '支持多种3D文件格式，兼容主流建模软件'
          }
        },
        applications: {
          title: '公仔生成的应用领域',
          gameDev: {
            title: '游戏开发',
            desc: '为游戏角色设计提供快速的原型制作方案，加速游戏开发流程'
          },
          filmProduction: {
            title: '影视制作',
            desc: '为动画电影、电视剧提供角色设计参考，提升制作效率'
          },
          figureMaking: {
            title: '手办制作',
            desc: '为手办制造商提供设计原型，降低开发成本'
          },
          education: {
            title: '教育培训',
            desc: '帮助学生理解3D建模概念，培养创意思维和设计能力'
          },
          personalCreation: {
            title: '个人创作',
            desc: '为个人创作者提供便捷的3D建模工具，实现创意想法'
          }
        },
        workflow: {
          title: '公仔生成的技术流程',
          dataPreprocessing: {
            title: '数据预处理',
            desc: '对输入的图片或文字进行预处理，提取关键特征信息'
          },
          featureAnalysis: {
            title: '特征分析',
            desc: '使用深度学习算法分析输入特征，理解设计意图'
          },
          d3dModeling: {
            title: '3D建模',
            desc: '基于分析结果生成3D几何模型，包括形状、纹理、颜色等'
          },
          qualityOptimization: {
            title: '质量优化',
            desc: '对生成的模型进行质量检查和优化，确保输出质量'
          },
          formatConversion: {
            title: '格式转换',
            desc: '将3D模型转换为标准格式，便于后续使用和分享'
          }
        },
        advantages: {
          title: '公仔生成的优势特点',
          technicalAdvantages: {
            title: '技术优势',
            items: [
              '高度自动化，减少人工干预',
              '生成速度快，几秒钟完成',
              '质量稳定，输出一致性好',
              '支持多种输入格式'
            ]
          },
          applicationAdvantages: {
            title: '应用优势',
            items: [
              '降低创作门槛，人人可用',
              '提高创作效率，节省时间',
              '激发创意灵感，拓展思路',
              '支持个性化定制'
            ]
          }
        },
        future: {
          title: '公仔生成的未来发展趋势',
          desc1: '随着人工智能技术的不断进步，公仔生成技术将朝着更加智能化、个性化的方向发展。未来的公仔生成系统将能够更好地理解用户的情感需求和审美偏好，生成更加符合用户期望的公仔设计。同时，随着虚拟现实和增强现实技术的发展，用户将能够在虚拟世界中实时预览和调整公仔设计。',
          desc2: '此外，公仔生成技术还将与3D打印技术更加紧密地结合，用户将能够轻松地将AI生成的公仔模型转化为真实的实体公仔。这将为个人收藏、商业展示、教育培训等领域带来新的可能性。',
          desc3: '总的来说，公仔生成技术代表了创意产业数字化发展的重要方向。它不仅为传统的手办制作、游戏开发等行业提供了新的工具和方法，也为个人创作者提供了更多表达创意的机会。随着技术的不断成熟和普及，公仔生成将成为创意设计领域不可或缺的重要工具。'
        }
      }
    },
    nanoBananaModel: {
      title: 'NanoBanana模型 公仔 AI - 革命性AI技术',
      subtitle: 'NanoBanana模型 公仔 AI采用最先进的深度学习技术，能够将您的创意想法转化为精美的3D 公仔 模型。我们的AI系统经过大量数据训练，具备强大的理解和生成能力。',
      cta: '立即上传图片制作AI 公仔',
      ctaEnd: '体验NanoBanana模型AI 公仔生成',
      keywords: {
        nanoBanana: 'NanoBanana AI',
        deepLearning: '深度学习模型',
        neuralNetwork: '神经网络 公仔 ',
        aiAlgorithm: 'AI算法建模',
        mlFigurine: '机器学习 公仔 ',
        smartSystem: '智能 公仔 系统',
        aiTraining: 'AI模型训练',
        autoModeling: '自动化建模'
      },
      examples: {
        smartRecognition: {
          title: '智能识别模型',
          desc: '基于NanoBanana AI的智能识别，精准捕捉设计细节'
        },
        deepLearning: {
          title: '深度学习生成',
          desc: '运用深度学习算法，生成高质量3D 公仔 模型'
        },
        multiStyle: {
          title: '多风格适配',
          desc: '支持多种艺术风格，满足不同创作需求'
        }
      },
      sections: {
        architecture: {
          title: 'NanoBanana模型 公仔 AI技术架构',
          desc1: 'NanoBanana模型 公仔 AI是一个基于深度学习的先进AI系统，专门用于生成高质量的3D 公仔 模型。该系统采用了最新的生成对抗网络（GAN）技术，结合变分自编码器（VAE）和注意力机制，能够准确理解用户的输入需求并生成符合要求的3D模型。通过神经网络 公仔 生成、AI算法建模和机器学习 公仔 技术，NanoBanana模型实现了智能 公仔 系统的突破性进展。',
          desc2: '我们的AI模型经过了数百万张3D模型图片的训练，涵盖了各种风格、主题和类型的 公仔 设计。这使得NanoBanana模型能够理解复杂的视觉特征，包括形状、纹理、颜色、比例等，并能够将这些特征准确地转化为3D几何结构。通过深度学习模型训练、AI模型训练和自动化建模技术，我们的智能 公仔 系统能够实现前所未有的精度和效率。',
          desc3: 'NanoBanana模型的核心优势在于其强大的泛化能力和创造性。它不仅能够复制现有的设计风格，还能够根据用户的创意需求生成全新的、独特的 公仔 设计。这种创造性使得每个生成的 公仔 都具有独特的个性，满足用户的个性化需求。通过AI算法建模、智能 公仔 系统和机器学习 公仔 技术，NanoBanana模型为AI手办制作、数字 公仔 生成和智能3D打印领域带来了革命性的变化。'
        },
        features: {
          title: 'NanoBanana模型的核心特性',
          smartUnderstanding: {
            title: '智能理解',
            desc: '基于自然语言处理技术，准确理解用户的文字描述'
          },
          efficientProcessing: {
            title: '高效处理',
            desc: '采用GPU加速技术，实现快速模型生成'
          },
          preciseModeling: {
            title: '精准建模',
            desc: '生成高精度的3D几何模型，细节丰富'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备创造性思维，能够生成独特的原创设计'
          }
        },
        advantages: {
          title: 'NanoBanana模型的技术优势',
          advanced: '先进算法',
          advancedDesc: '采用最新的深度学习算法，确保生成质量',
          fast: '快速生成',
          fastDesc: '优化的计算架构，实现秒级模型生成',
          accurate: '高精度输出',
          accurateDesc: '生成模型具有极高的几何精度和细节表现',
          flexible: '灵活适配',
          flexibleDesc: '支持多种输入格式和输出需求'
        },
        applications: {
          title: 'NanoBanana模型的应用场景',
          commercial: {
            title: '商业应用',
            items: [
              '游戏角色设计',
              '动漫IP开发',
              '手办原型制作',
              '影视特效制作'
            ]
          },
          personal: {
            title: '个人创作',
            items: [
              '个人收藏制作',
              '创意设计探索',
              '艺术创作辅助',
              '学习3D建模'
            ]
          }
        },
        workflow: {
          title: 'NanoBanana模型的工作流程',
          inputParsing: {
            title: '输入解析',
            desc: 'NanoBanana AI系统解析用户的输入信息，包括文字描述、图片特征等'
          },
          featureExtraction: {
            title: '特征提取',
            desc: '使用深度学习算法提取关键特征，理解用户的设计意图'
          },
          modelGeneration: {
            title: '模型生成',
            desc: '基于提取的特征生成3D几何模型，包括形状、纹理、颜色等'
          },
          qualityOptimization: {
            title: '质量优化',
            desc: '对生成的模型进行质量检查和优化，确保输出符合标准'
          },
          outputDelivery: {
            title: '输出交付',
            desc: '将优化后的3D模型转换为标准格式，供用户下载使用'
          }
        },
        innovation: {
          title: 'NanoBanana模型的创新突破',
          desc1: 'NanoBanana模型在AI公仔生成领域实现了多项技术突破。首先，我们采用了最新的多模态学习技术，能够同时处理文字、图片、语音等多种输入方式，大大提升了用户交互的便利性。其次，我们引入了注意力机制和自注意力网络，使得模型能够更好地理解复杂的语义关系和空间结构。',
          desc2: '此外，NanoBanana模型还采用了对抗训练和强化学习技术，通过不断的自我优化和反馈学习，持续提升生成质量。我们的模型不仅能够生成静态的3D模型，还能够生成动态的动画序列，为公仔设计增添了更多可能性。',
          desc3: '最重要的是，NanoBanana模型具备强大的创造性和适应性。它能够根据用户的个性化需求调整生成策略，创造出真正符合用户期望的独特公仔设计。这种个性化能力使得每个用户都能获得独一无二的创作体验。'
        },
        future: {
          title: 'NanoBanana模型的未来展望',
          desc1: '随着人工智能技术的不断发展，NanoBanana模型将继续进化和升级。我们计划在未来版本中集成更多的AI技术，包括自然语言理解、计算机视觉、语音识别等，为用户提供更加智能和便捷的创作体验。',
          desc2: '同时，我们也将探索与虚拟现实、增强现实等新兴技术的结合，让用户能够在虚拟世界中实时预览和调整公仔设计。这将为创意设计带来全新的交互方式和体验模式。',
          desc3: '总的来说，NanoBanana模型代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，NanoBanana模型将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    figurineCommand: {
      title: '公仔指令 - 精准控制AI创作',
      subtitle: '掌握公仔指令，让您能够精准控制AI生成过程，创造出更符合您期望的3D公仔模型。通过专业的指令技巧，实现从简单描述到复杂设计的完美转换。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '立即使用AI指令制作公仔',
      keywords: {
        commandControl: '指令控制',
        parameterAdjust: '参数调节',
        smartSystem: '智能系统',
        creationControl: '创作控制',
        customCommand: '定制指令',
        modelingCommand: '建模指令'
      },
      examples: {
        basic: {
          title: '基础指令控制',
          desc: '掌握基础AI指令，实现基本的公仔生成控制'
        },
        advanced: {
          title: '高级指令技巧',
          desc: '运用高级指令技巧，实现复杂的公仔设计需求'
        },
        professional: {
          title: '专业指令应用',
          desc: '专业级AI指令应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是公仔指令？',
          desc1: '公仔指令是一种专门用于控制AI生成3D公仔模型的指令系统。通过精确的指令语言，用户可以详细描述公仔的外观、风格、材质、姿态等各个方面，让AI系统按照用户的具体要求生成符合预期的3D模型。',
          desc2: '与传统的文字描述不同，公仔指令采用了结构化的指令格式，能够更准确地传达用户的创作意图。每个指令都经过精心设计，能够控制公仔的特定属性，如颜色、纹理、形状、比例等，确保生成结果与用户期望高度一致。',
          desc3: '公仔指令系统不仅支持单一属性的控制，还能够通过指令组合实现复杂的创作需求。用户可以同时使用多个指令来创造独特的公仔设计，从简单的角色定制到复杂的场景创作，都能通过指令系统轻松实现。'
        },
        coreFeatures: {
          title: '公仔指令的核心功能',
          preciseControl: {
            title: '精确控制',
            desc: '通过指令精确控制公仔的每个细节特征'
          },
          flexibleCombination: {
            title: '灵活组合',
            desc: '支持多个指令的组合使用，实现复杂设计'
          },
          smartUnderstanding: {
            title: '智能理解',
            desc: 'AI系统能够准确理解指令的语义和意图'
          },
          fastResponse: {
            title: '快速响应',
            desc: '指令执行速度快，实时生成结果'
          }
        },
        commandTypes: {
          title: '公仔指令类型',
          appearance: {
            title: '外观指令',
            desc: '控制公仔的外观特征，包括颜色、纹理、材质等',
            example: '--color:blue --texture:metallic --style:anime'
          },
          style: {
            title: '风格指令',
            desc: '指定公仔的艺术风格和设计方向',
            example: '--style:realistic --mood:cute --theme:fantasy'
          },
          material: {
            title: '材质指令',
            desc: '定义公仔的表面材质和质感效果',
            example: '--material:ceramic --finish:glossy --detail:high'
          },
          pose: {
            title: '姿态指令',
            desc: '控制公仔的动作姿态和表情',
            example: '--pose:standing --expression:happy --action:waving'
          }
        },
        advancedTechniques: {
          title: '高级指令技巧',
          weightControl: {
            title: '权重控制',
            desc: '通过权重参数调整不同指令的影响程度',
            example: '--color:blue:0.8 --style:anime:0.6'
          },
          negativeCommand: {
            title: '否定指令',
            desc: '使用否定指令排除不需要的特征',
            example: '--no:hat --no:glasses --avoid:dark'
          },
          combinationCommand: {
            title: '组合指令',
            desc: '将多个指令组合使用，创造复杂效果',
            example: '--style:anime + --color:rainbow + --pose:dancing'
          },
          referenceCommand: {
            title: '参考指令',
            desc: '基于参考图片或模型进行指令优化',
            example: '--reference:image.jpg --adapt:style --enhance:details'
          }
        },
        optimizationStrategies: {
          title: '指令优化策略',
          writingTips: {
            title: '指令编写技巧',
            items: [
              '使用简洁明确的指令语言',
              '避免矛盾的指令组合',
              '合理使用权重参数',
              '测试不同指令组合效果'
            ]
          },
          debuggingMethods: {
            title: '调试方法',
            items: [
              '逐步添加指令测试效果',
              '使用否定指令排除问题',
              '调整权重参数优化结果',
              '参考成功案例学习技巧'
            ]
          }
        },
        practicalExamples: {
          title: '实用指令示例',
          anime: {
            title: '动漫风格公仔',
            example: '--style:anime --color:vibrant --pose:dynamic --mood:energetic'
          },
          scifi: {
            title: '科幻主题公仔',
            example: '--theme:scifi --material:metallic --color:silver --pose:futuristic'
          },
          realistic: {
            title: '写实风格公仔',
            example: '--style:realistic --texture:detailed --color:natural --pose:casual'
          }
        },
        futureDevelopment: {
          title: '公仔指令的未来发展',
          desc1: '随着人工智能技术的不断发展，公仔指令系统也将变得更加智能和人性化。未来的AI指令将支持更自然的语言表达，用户可以用更口语化的方式描述需求，AI系统能够自动理解和优化指令内容。',
          desc2: '同时，AI指令系统还将支持多模态输入，用户可以通过语音、手势、甚至思维来控制AI生成过程。这将大大降低使用门槛，让更多人能够轻松掌握AI创作技巧。',
          desc3: '此外，AI指令系统还将具备学习能力，能够根据用户的使用习惯和偏好自动优化指令建议，为用户提供更加个性化的创作体验。这将使得AI创作变得更加智能和高效，为创意产业带来新的发展机遇。'
        }
      }
    },
    geminiAIFigurine: {
      title: 'Gemini AI公仔 - 革命性AI技术',
      subtitle: 'Gemini AI公仔采用Google最先进的多模态AI技术，能够将您的创意想法转化为精美的3D公仔模型。我们的AI系统具备强大的理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验Gemini AI公仔生成',
      keywords: {
        geminiAI: 'Gemini AI',
        googleAI: 'Google AI',
        multiModal: '多模态AI',
        advancedModel: '先进模型',
        creativeAI: '创意AI',
        smartGeneration: '智能生成'
      },
      examples: {
        creative: {
          title: '创意AI生成',
          desc: '基于Gemini AI的创意生成，实现独特的公仔设计'
        },
        advanced: {
          title: '高级AI技术',
          desc: '运用Google先进AI技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业AI应用',
          desc: '专业级Gemini AI应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是Gemini AI公仔？',
          desc1: 'Gemini AI公仔是基于Google Gemini多模态AI技术开发的先进公仔生成系统。该系统能够理解文字、图片、语音等多种输入方式，并生成高质量的3D公仔模型。Gemini AI具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的AI生成系统不同，Gemini AI公仔采用了最新的多模态学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: 'Gemini AI公仔还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: 'Gemini AI公仔的核心特性',
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          advancedProcessing: {
            title: '先进处理',
            desc: '采用Google最新的AI处理技术，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: 'Gemini AI公仔的技术架构',
          desc1: 'Gemini AI公仔采用了Google最新的多模态大语言模型技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上，Gemini AI公仔结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，Gemini AI公仔还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: 'Gemini AI公仔的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'Gemini AI公仔的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google最新的多模态AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与Google生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'Gemini AI公仔的未来发展',
          desc1: '随着Google AI技术的不断进步，Gemini AI公仔将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与Google其他AI服务的深度整合，如Google Cloud AI、Google Workspace等，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，Gemini AI公仔代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，Gemini AI公仔将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    geminiFigurine: {
      title: ' Gemini公仔 - 创新AI技术',
      subtitle: ' Gemini公仔 采用Google最先进的AI技术，能够将您的创意想法转化为精美的3D公仔模型。我们的AI系统具备强大的理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验 Gemini公仔 生成',
      keywords: {
        geminiModel: 'Gemini模型',
        googleTech: 'Google技术',
        advancedAI: '先进AI',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新AI生成',
          desc: '基于Gemini模型的创新生成，实现独特的公仔设计'
        },
        advanced: {
          title: '高级AI技术',
          desc: '运用Google先进AI技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业AI应用',
          desc: '专业级Gemini AI应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是 Gemini公仔 ？',
          desc1: ' Gemini公仔 是基于Google Gemini AI技术开发的先进公仔生成系统。该系统能够理解文字、图片等多种输入方式，并生成高质量的3D公仔模型。Gemini AI具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的AI生成系统不同， Gemini公仔 采用了最新的多模态学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: ' Gemini公仔 还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: ' Gemini公仔 的核心特性',
          advancedModel: {
            title: '先进模型',
            desc: '采用Google最新的Gemini AI模型，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: ' Gemini公仔 的技术架构',
          desc1: ' Gemini公仔 采用了Google最新的多模态大语言模型技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上， Gemini公仔 结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外， Gemini公仔 还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: ' Gemini公仔 的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: ' Gemini公仔 的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google最新的Gemini AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与Google生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: ' Gemini公仔 的未来发展',
          desc1: '随着Google AI技术的不断进步， Gemini公仔 将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与Google其他AI服务的深度整合，如Google Cloud AI、Google Workspace等，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说， Gemini公仔 代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步， Gemini公仔 将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    googleFigurine: {
      title: 'Google公仔 - 智能AI技术',
      subtitle: 'Google公仔采用Google最先进的AI技术，能够将您的创意想法转化为精美的3D公仔模型。我们的AI系统具备强大的理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验Google公仔生成',
      keywords: {
        googleAI: 'Google AI',
        googleTech: 'Google技术',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新AI生成',
          desc: '基于Google AI的创新生成，实现独特的公仔设计'
        },
        advanced: {
          title: '高级AI技术',
          desc: '运用Google先进AI技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业AI应用',
          desc: '专业级Google AI应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是Google公仔？',
          desc1: 'Google公仔是基于Google AI技术开发的先进公仔生成系统。该系统能够理解文字、图片等多种输入方式，并生成高质量的3D公仔模型。Google AI具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的AI生成系统不同，Google公仔采用了最新的多模态学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: 'Google公仔还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: 'Google公仔的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google最新的AI技术，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: 'Google公仔的技术架构',
          desc1: 'Google公仔采用了Google最新的多模态大语言模型技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上，Google公仔结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，Google公仔还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: 'Google公仔的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'Google公仔的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google最新的AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与Google生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'Google公仔的未来发展',
          desc1: '随着Google AI技术的不断进步，Google公仔将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与Google其他AI服务的深度整合，如Google Cloud AI、Google Workspace等，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，Google公仔代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，Google公仔将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    googleAIFigurine: {
      title: ' GoogleAI公仔 - 革命性AI技术',
      subtitle: ' GoogleAI公仔 采用Google最先进的多模态AI技术，能够将您的创意想法转化为精美的3D公仔模型。我们的AI系统具备强大的理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验 GoogleAI公仔 生成',
      keywords: {
        googleAI: 'Google AI',
        googleTech: 'Google技术',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新AI生成',
          desc: '基于Google AI的创新生成，实现独特的公仔设计'
        },
        advanced: {
          title: '高级AI技术',
          desc: '运用Google先进AI技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业AI应用',
          desc: '专业级Google AI应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是 GoogleAI公仔 ？',
          desc1: ' GoogleAI公仔 是基于Google多模态AI技术开发的先进公仔生成系统。该系统能够理解文字、图片、语音等多种输入方式，并生成高质量的3D公仔模型。Google AI具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的AI生成系统不同， GoogleAI公仔 采用了最新的多模态学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: ' GoogleAI公仔 还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: ' GoogleAI公仔 的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google最新的多模态AI技术，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: ' GoogleAI公仔 的技术架构',
          desc1: ' GoogleAI公仔 采用了Google最新的多模态大语言模型技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上， GoogleAI公仔 结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外， GoogleAI公仔 还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: ' GoogleAI公仔 的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'Google AI公仔的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google最新的AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与Google生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'Google AI公仔的未来发展',
          desc1: '随着Google AI技术的不断进步，Google AI公仔将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与Google其他AI服务的深度整合，如Google Cloud AI、Google Workspace等，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，Google AI公仔代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，Google AI公仔将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    googleAIStudioFigurine: {
      title: 'Google AI Studio公仔 - 专业AI创作平台',
      subtitle: 'Google AI Studio公仔基于Google AI Studio平台，为专业创作者提供强大的AI公仔生成工具。结合Google最先进的AI技术，让您的创意想法快速转化为精美的3D公仔模型。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验Google AI Studio公仔生成',
      keywords: {
        googleAIStudio: 'Google AI Studio',
        googleTech: 'Google技术',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新Studio生成',
          desc: '基于Google AI Studio的创新生成，实现独特的公仔设计'
        },
        advanced: {
          title: '高级Studio技术',
          desc: '运用Google AI Studio先进技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业Studio应用',
          desc: '专业级Google AI Studio应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是Google AI Studio公仔？',
          desc1: 'Google AI Studio公仔是基于Google AI Studio平台开发的先进公仔生成系统。该系统充分利用Google AI Studio的强大功能，能够理解文字、图片等多种输入方式，并生成高质量的3D公仔模型。Google AI Studio具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的AI生成系统不同，Google AI Studio公仔采用了最新的多模态学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: 'Google AI Studio公仔还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: 'Google AI Studio公仔的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google AI Studio最新的AI技术，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: 'Google AI Studio公仔的技术架构',
          desc1: 'Google AI Studio公仔采用了Google AI Studio平台的最新技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上，Google AI Studio公仔结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，Google AI Studio公仔还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: 'Google AI Studio公仔的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'Google AI Studio公仔的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用Google AI Studio最新的AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与Google AI Studio生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'Google AI Studio公仔的未来发展',
          desc1: '随着Google AI Studio技术的不断进步，Google AI Studio公仔将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与Google AI Studio其他功能的深度整合，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，Google AI Studio公仔代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，Google AI Studio公仔将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    ai3DFigurine: {
      title: 'AI 3D公仔 - 立体AI创作技术',
      subtitle: 'AI 3D公仔采用最先进的3D建模AI技术，能够将您的创意想法转化为精美的立体公仔模型。我们的AI系统具备强大的三维理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验AI 3D公仔生成',
      keywords: {
        ai3D: 'AI 3D',
        threeDimensional: '三维立体',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新3D生成',
          desc: '基于AI 3D技术的创新生成，实现独特的立体公仔设计'
        },
        advanced: {
          title: '高级3D技术',
          desc: '运用AI 3D先进技术，生成高质量立体公仔模型'
        },
        professional: {
          title: '专业3D应用',
          desc: '专业级AI 3D应用，实现精准的立体公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是AI 3D公仔？',
          desc1: 'AI 3D公仔是基于先进3D建模AI技术开发的立体公仔生成系统。该系统能够理解文字、图片等多种输入方式，并生成高质量的3D立体公仔模型。AI 3D技术具备强大的三维空间理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的2D AI生成系统不同，AI 3D公仔采用了最新的三维深度学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D立体模型特征。',
          desc3: 'AI 3D公仔还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的立体创作成果。'
        },
        coreFeatures: {
          title: 'AI 3D公仔的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的3D建模AI技术，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创立体设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: 'AI 3D公仔的技术架构',
          desc1: 'AI 3D公仔采用了最新的3D建模AI技术，具备强大的三维理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的三维空间关系和几何结构。',
          desc2: '在技术实现上，AI 3D公仔结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，AI 3D公仔还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: 'AI 3D公仔的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'AI 3D公仔的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的3D建模AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与3D建模生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'AI 3D公仔的未来发展',
          desc1: '随着3D建模AI技术的不断进步，AI 3D公仔将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的三维理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与3D建模其他技术的深度整合，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，AI 3D公仔代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，AI 3D公仔将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    makeFigurineAI: {
      title: '制作公仔AI - 智能创作技术',
      subtitle: '制作公仔AI采用最先进的人工智能技术，能够将您的创意想法转化为精美的3D公仔模型。我们的AI系统具备强大的理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验制作公仔AI生成',
      keywords: {
        makeFigurine: '制作公仔',
        aiTechnology: 'AI技术',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新AI制作',
          desc: '基于AI的创新制作技术，实现独特的公仔设计'
        },
        advanced: {
          title: '高级制作技术',
          desc: '运用AI先进技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业制作应用',
          desc: '专业级AI制作应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是制作公仔AI？',
          desc1: '制作公仔AI是基于先进人工智能技术开发的公仔制作系统。该系统能够理解文字、图片等多种输入方式，并生成高质量的3D公仔模型。AI技术具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的制作系统不同，制作公仔AI采用了最新的深度学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: '制作公仔AI还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: '制作公仔AI的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的AI技术，确保制作质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: '制作公仔AI的技术架构',
          desc1: '制作公仔AI采用了最新的深度学习技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上，制作公仔AI结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，制作公仔AI还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: '制作公仔AI的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: '制作公仔AI的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的AI技术，确保制作质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与创作生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: '制作公仔AI的未来发展',
          desc1: '随着AI技术的不断进步，制作公仔AI将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与其他AI服务的深度整合，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，制作公仔AI代表了AI公仔制作技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，制作公仔AI将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    ai3DFigurine2: {
      title: 'AI 3D公仔 - 立体创作技术',
      subtitle: 'AI 3D公仔采用最先进的3D建模AI技术，能够将您的创意想法转化为精美的立体公仔模型。我们的AI系统具备强大的三维理解和生成能力，为创意设计带来无限可能。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验AI 3D公仔生成',
      keywords: {
        ai3D: 'AI 3D',
        threeDimensional: '三维立体',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新3D生成',
          desc: '基于AI 3D技术的创新生成，实现独特的立体公仔设计'
        },
        advanced: {
          title: '高级3D技术',
          desc: '运用AI 3D先进技术，生成高质量立体公仔模型'
        },
        professional: {
          title: '专业3D应用',
          desc: '专业级AI 3D应用，实现精准的立体公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是AI 3D公仔？',
          desc1: 'AI 3D公仔是基于先进3D建模AI技术开发的立体公仔生成系统。该系统能够理解文字、图片等多种输入方式，并生成高质量的3D立体公仔模型。AI 3D技术具备强大的三维空间理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的2D AI生成系统不同，AI 3D公仔采用了最新的三维深度学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D立体模型特征。',
          desc3: 'AI 3D公仔还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的立体创作成果。'
        },
        coreFeatures: {
          title: 'AI 3D公仔的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的3D建模AI技术，确保生成质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创立体设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: 'AI 3D公仔的技术架构',
          desc1: 'AI 3D公仔采用了最新的3D建模AI技术，具备强大的三维理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的三维空间关系和几何结构。',
          desc2: '在技术实现上，AI 3D公仔结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，AI 3D公仔还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: 'AI 3D公仔的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'AI 3D公仔的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的3D建模AI技术，确保生成质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与3D建模生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'AI 3D公仔的未来发展',
          desc1: '随着3D建模AI技术的不断进步，AI 3D公仔将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的三维理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与3D建模其他技术的深度整合，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，AI 3D公仔代表了AI公仔生成技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，AI 3D公仔将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    aiFigurineMake: {
      title: 'AI公仔制作 - 智能创作流程',
      subtitle: 'AI公仔制作采用最先进的人工智能技术，为创作者提供完整的公仔制作解决方案。从创意构思到最终成品，AI技术贯穿整个制作流程，让创作变得更加简单高效。',
      cta: '立即上传图片制作AI公仔',
      ctaEnd: '体验AI公仔制作流程',
      keywords: {
        aiFigurine: 'AI公仔',
        makeProcess: '制作流程',
        advancedModel: '先进模型',
        creativeDesign: '创意设计',
        smartGeneration: '智能生成',
        innovativeTech: '创新技术'
      },
      examples: {
        innovative: {
          title: '创新制作流程',
          desc: '基于AI的创新制作流程，实现独特的公仔设计'
        },
        advanced: {
          title: '高级制作技术',
          desc: '运用AI先进技术，生成高质量3D公仔模型'
        },
        professional: {
          title: '专业制作应用',
          desc: '专业级AI制作应用，实现精准的公仔创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是AI公仔制作？',
          desc1: 'AI公仔制作是基于先进人工智能技术开发的完整公仔制作系统。该系统能够理解文字、图片等多种输入方式，并生成高质量的3D公仔模型。AI技术具备强大的语义理解能力和创造性思维，能够准确捕捉用户的创作意图。',
          desc2: '与传统的制作系统不同，AI公仔制作采用了最新的深度学习技术，能够同时处理多种类型的输入信息。无论是文字描述、参考图片，还是语音指令，系统都能准确理解并转化为相应的3D模型特征。',
          desc3: 'AI公仔制作还具备强大的适应性和学习能力。它能够根据用户的使用习惯和偏好不断优化生成策略，为用户提供更加个性化和精准的创作体验。这种智能化的特性使得每个用户都能获得独一无二的创作成果。'
        },
        coreFeatures: {
          title: 'AI公仔制作的核心特性',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的AI技术，确保制作质量'
          },
          creativeGeneration: {
            title: '创意生成',
            desc: '具备强大的创造性思维，能够生成独特的原创设计'
          },
          multiModal: {
            title: '多模态处理',
            desc: '支持文字、图片、语音等多种输入方式'
          },
          smartOptimization: {
            title: '智能优化',
            desc: '自动优化生成参数，确保最佳输出效果'
          }
        },
        technology: {
          title: 'AI公仔制作的技术架构',
          desc1: 'AI公仔制作采用了最新的深度学习技术，具备强大的理解和生成能力。该系统基于Transformer架构，通过大规模预训练和微调，能够准确理解复杂的语义关系和空间结构。',
          desc2: '在技术实现上，AI公仔制作结合了计算机视觉、自然语言处理和3D建模等多个领域的先进技术。系统能够将2D图像信息转化为3D几何结构，同时保持细节的完整性和准确性。',
          desc3: '此外，AI公仔制作还采用了强化学习和对抗训练技术，通过不断的自我优化和反馈学习，持续提升生成质量。这种技术架构使得系统能够适应各种复杂的创作需求，为用户提供稳定可靠的创作工具。'
        },
        applications: {
          title: 'AI公仔制作的应用领域',
          creative: {
            title: '创意设计',
            items: [
              '动漫角色设计',
              '游戏人物创作',
              '艺术雕塑制作',
              '个性化定制'
            ]
          },
          commercial: {
            title: '商业应用',
            items: [
              '手办原型制作',
              '影视特效制作',
              '产品设计辅助',
              '营销物料生成'
            ]
          }
        },
        advantages: {
          title: 'AI公仔制作的技术优势',
          advancedAI: {
            title: '先进AI技术',
            desc: '采用最新的AI技术，确保制作质量'
          },
          creativeFlexibility: {
            title: '创意灵活性',
            desc: '支持多种创作风格和设计方向，满足不同需求'
          },
          qualityOutput: {
            title: '高质量输出',
            desc: '生成模型具有极高的几何精度和细节表现'
          },
          integration: {
            title: '无缝集成',
            desc: '与创作生态系统深度集成，提供流畅的使用体验'
          }
        },
        future: {
          title: 'AI公仔制作的未来发展',
          desc1: '随着AI技术的不断进步，AI公仔制作将继续进化和升级。我们计划在未来版本中集成更多的AI能力，包括更强大的多模态理解、更精准的3D建模、更智能的创意生成等。',
          desc2: '同时，我们也将探索与其他AI服务的深度整合，为用户提供更加完整和便捷的创作生态系统。这将为创意设计带来全新的工作流程和体验模式。',
          desc3: '总的来说，AI公仔制作代表了AI公仔制作技术的前沿水平，它不仅为当前的创意设计提供了强大的工具支持，也为未来的技术发展指明了方向。我们相信，随着技术的不断进步，AI公仔制作将为更多用户带来无限可能的创作体验。'
        }
      }
    },
    figurineAICommand: {
      title: ' 公仔 AI指令 - 精准控制AI创作',
      subtitle: '掌握 公仔 AI指令，让您能够精准控制AI生成过程，创造出更符合您期望的3D 公仔 模型。通过专业的指令技巧，实现从简单描述到复杂设计的完美转换。',
      cta: '立即上传图片制作AI 公仔',
      ctaEnd: '立即使用AI指令制作 公仔 ',
      keywords: {
        aiCommand: 'AI指令控制',
        generationCommand: ' 公仔 生成指令',
        smartSystem: '智能指令系统',
        parameterAdjust: 'AI参数调节',
        designCommand: ' 公仔 设计指令',
        creationControl: 'AI创作控制',
        modelingCommand: '智能建模指令',
        customCommand: ' 公仔 定制指令'
      },
      examples: {
        basic: {
          title: '基础指令控制',
          desc: '掌握基础AI指令，实现基本的 公仔 生成控制'
        },
        advanced: {
          title: '高级指令技巧',
          desc: '运用高级指令技巧，实现复杂的 公仔 设计需求'
        },
        professional: {
          title: '专业指令应用',
          desc: '专业级AI指令应用，实现精准的 公仔 创作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什么是 公仔 AI指令？',
          desc1: ' 公仔 AI指令是一种专门用于控制AI生成3D 公仔 模型的指令系统。它通过特定的语法和关键词，让用户能够精确地指导AI系统生成符合要求的 公仔 设计。这些指令涵盖了 公仔 的外观特征、风格类型、材质质感、动作姿态等各个方面，为用户提供了强大的创作控制能力。通过AI指令控制、 公仔 生成指令和智能指令系统，用户可以精确控制AI创作过程。',
          desc2: 'AI指令系统基于自然语言处理技术，能够理解用户的指令意图并转化为具体的生成参数。通过学习和掌握这些指令，用户可以从简单的文字描述中生成复杂的3D 公仔 模型，实现从创意到成品的快速转换。这种AI参数调节、 公仔 设计指令和AI创作控制技术为智能建模指令和 公仔 定制指令提供了强大的支持。',
          desc3: ' 公仔 AI指令的优势在于其灵活性和精确性。用户可以根据自己的需求调整指令内容，实现个性化的创作效果。同时，指令系统还支持组合使用，通过多个指令的组合，可以创造出更加复杂和独特的 公仔 设计。通过智能指令系统、AI创作控制和 公仔 生成指令，用户可以轻松实现从简单描述到复杂设计的完美转换。'
        }
      }
    }
  },
  'zh-tw': {
    nav: {
      home: '首頁',
      pricing: '定價',
      gallery: '畫廊',
      about: '關於我們',
      login: '登入',
      getStarted: '開始使用',
      aiGenerator: 'AI生成器'
    },
    hero: {
      title: '將你的想法轉化為驚豔的 AI 公仔 | 專業3D公仔創作平台',
      subtitle: '使用我們先進的 AI 公仔 生成技術，在幾秒鐘內創作出美麗、獨特的3D公仔模型。Nano Banana是專業的AI公仔生成器，支援多種公仔風格創作。',
      cta: '立即開始 AI 公仔 創作',
      learnMore: '了解更多公仔創作技巧',
      examplePrompt: '粉色頭髮的可愛動漫女孩 AI 公仔 ',
    },
    what: {
      title: '什麼是Nano Banana AI 公仔生成器？',
      subtitle: 'Nano Banana是專業的AI 公仔創作平台，將你的文字描述轉化為驚豔的3D公仔模型。我們的AI公仔生成器支援多種公仔風格，是創作者的首選公仔製作工具。',
      feature1: {
        title: 'AI公仔驅動生成',
        desc: '先進的人工智慧在幾秒鐘內將你的文字描述轉化為驚豔、獨特的3D公仔模型。我們的AI公仔生成技術確保每個公仔都是獨一無二的藝術作品。',
      },
      feature2: {
        title: '多種AI公仔風格',
        desc: '選擇動漫公仔、寫實公仔、Q版公仔、奇幻公仔等數十種公仔風格。每個公仔都經過AI精心設計，滿足不同創作者的公仔需求。',
      },
      feature3: {
        title: '高品質3D公仔模型',
        desc: '生成詳細的3D公仔模型，完美適用於3D列印、遊戲和收藏品。我們的AI公仔生成器確保每個公仔都具備專業級的品質。',
      },
      feature4: {
        title: '極速AI公仔生成',
        desc: '在30秒內獲得你的定制AI公仔模型。無需等待，無延遲 - 即時公仔創作體驗。讓AI公仔生成變得簡單高效。',
      },
    },
    why: {
      title: '為什麼選擇Nano Banana AI公仔生成器？',
      subtitle: '體驗AI公仔創作的未來，專業3D公仔製作平台',
      reason1: {
        title: 'AI公仔隱私與安全',
        desc: '你的AI公仔提示詞和生成的3D公仔模型完全私密。我們絕不會在未經許可的情況下儲存或分享你的公仔創意內容',
        stats: '公仔隱私優先'
      },
      reason2: {
        title: '公仔創作者信賴',
        desc: '加入超過50萬名藝術家、設計師和創作者，他們都依賴Nano Banana進行AI公仔專案創作。我們的AI公仔生成器是創作者的首選工具。',
        stats: '公仔創作者信賴'
      },
      reason3: {
        title: 'AI公仔業界領先',
        desc: '我們的AI公仔模型採用最新技術訓練，相比其他平台提供卓越的3D公仔品質。每個AI公仔都經過精心優化。',
        stats: 'AI公仔頂級品質'
      },
      reason4: {
        title: 'AI公仔持續改進',
        desc: '我們根據用戶回饋和技術進步定期更新AI公仔模型並添加新功能。讓AI公仔生成技術始終保持領先。',
        stats: 'AI公仔始終進化'
      },
      stats: {
        uptime: 'AI公仔運行時間保證',
        support: '公仔創作客戶支援',
        images: '已生成AI公仔',
        styles: 'AI公仔風格',
      },
    },
    how: {
      title: '如何使用AI公仔生成器',
      subtitle: '創作AI公仔的三個簡單步驟，專業3D公仔製作流程',
      step1: {
        title: '輸入你的公仔提示詞',
        desc: '用簡單的詞彙描述你的AI公仔願景。盡可能創意和詳細，讓AI公仔生成器理解你的公仔創作需求',
      },
      step2: {
        title: '選擇你的 AI 公仔 風格',
        desc: '選擇各種 AI 公仔 風格，如動漫公仔、寫實公仔、Q版公仔等。我們的AI公仔生成器支援多種公仔風格',
      },
      step3: {
        title: '下載你的 AI 公仔 模型',
        desc: '獲得令人驚豔的AI生成3D公仔模型，隨時可用於3D列印。每個AI公仔都是獨特的藝術作品',
      },
    },
    stats: {
      images: '已創建公仔',
      users: '活躍用戶',
      uptime: '運行時間',
      support: '支援服務',
    },
    testimonials: {
      title: '用戶評價',
      subtitle: '加入數千名滿意的創作者，他們已經使用Nano Banana將想法轉化為驚豔的公仔模型。以下是他們Nano Banana體驗的評價',
      user1: {
        name: '陳莎拉',
        role: '3D藝術家',
        text: 'Nano Banana徹底改變了我的創意工作流程。AI生成3D公仔的品質絕對令人驚豔，可用的風格種類令人難以置信。我每天都在客戶專案中使用它。',
      },
      user2: {
        name: '馬庫斯·羅德里格斯',
        role: '遊戲開發者',
        text: '作為遊戲開發者，我需要快速獲得高品質3D模型。Nano Banana正是如此。速度和品質無與倫比，為我們團隊節省了無數時間和預算。',
      },
      user3: {
        name: '艾米麗·沃森',
        role: '收藏家',
        text: '起初我對AI生成公仔持懷疑態度，但Nano Banana完全改變了我的想法。模型如此詳細和創意 - 有時甚至比我想像的更好。就像擁有一個個人雕塑師。',
      },
      user4: {
        name: '金大衛',
        role: '3D列印師',
        text: '對於3D列印和收藏品，Nano Banana是一個遊戲改變者。多樣的風格和快速迭代的能力顯著加速了我的生產流程。強烈推薦！',
      },
      user5: {
        name: '麗莎·湯普森',
        role: '小企業主',
        text: '經營小企業，我需要價格實惠但專業的3D模型用於產品。Nano Banana正是如此。品質可以與昂貴的定制作品相媲美，但具有完全的定制性。',
      },
      user6: {
        name: '亞歷克斯·約翰遜',
        role: '自由設計師',
        text: 'Nano Banana的創意可能性是無限的。我可以探索需要手動創建數小時的想法和概念。它已成為我設計工具庫中的重要工具。',
      },
      stats: {
        averageRating: '平均評分',
        happyUsers: '滿意用戶',
        imagesGenerated: '已生成公仔',
        satisfactionRate: '滿意度',
      },
    },
    faq: {
      title: 'AI公仔生成器常見問題',
      subtitle: '關於Nano Banana AI公仔生成器你需要知道的一切',
      contact: '還有AI公仔創作問題？我們隨時為你提供幫助！',
      contactButton: '聯繫AI公仔支援',
      q1: 'Nano Banana AI公仔生成器是如何工作的？',
      a1: 'Nano Banana AI公仔生成器使用先進的AI模型來解讀你的文字描述並生成相應的3D公仔模型。只需輸入你想要創建的AI公仔內容，選擇你喜歡的公仔風格，我們的AI公仔生成器就會在幾秒鐘內創建獨特的3D公仔模型。',
      q2: '我可以生成什麼類型的AI公仔？',
      a2: '你可以生成幾乎任何類型的AI公仔 - 從動漫公仔角色到寫實公仔人物、Q版公仔風格、奇幻公仔生物、動物公仔等等。我們的AI公仔生成器支援150多種不同的公仔風格，可以處理複雜、詳細的AI公仔提示詞。',
      q3: '我可以創建的AI公仔數量有限制嗎？',
      a3: '免費用戶每天最多可以生成10個AI公仔。高級訂閱用戶可以獲得無限AI公仔生成、優先處理和訪問高級功能的權限，如更高細節級別和獨家AI公仔風格。',
      q4: '生成的AI公仔3D模型品質如何？',
      a4: '免費用戶獲得標準品質的AI公仔模型。高級用戶可以生成高細節 AI 公仔 模型，完美適用於3D列印、遊戲和專業用途。每個AI公仔都經過精心優化。',
      q5: '我可以商業使用生成的AI公仔嗎？',
      a5: '是的！所有使用Nano Banana AI公仔生成器生成的公仔都可以用於商業目的。你擁有 AI 公仔 創作的完全權利，包括銷售、修改和分發AI公仔的權利。',
      q6: '生成AI公仔需要多長時間？',
      a6: '大多數AI公仔在15-30秒內生成。高級用戶享受優先處理，在高峰時段可以將 AI 公仔 生成時間縮短到僅10秒。讓AI公仔創作變得高效便捷。',
      q7: 'Nano Banana AI公仔生成器與其他AI生成器有什麼不同？',
      a7: 'Nano Banana AI 公仔 生成器專注於3D公仔生成，注重 AI 公仔 品質、速度和用戶體驗。我們使用最新的AI公仔模型，提供比競爭對手更多的公仔風格，提供更好的AI公仔提示詞理解，並保持業界最高的3D公仔模型品質標準。',
      q8: '我的 AI 公仔 資料安全私密嗎？',
      a8: '絕對安全。我們認真對待 AI 公仔 隱私。你的 AI 公仔 提示詞和生成的3D公仔模型都經過加密，絕不會與第三方共享。你可以隨時刪除你的帳戶和所有相關AI公仔資料。',
    },
    footer: {
      description: '使用Nano Banana的尖端AI公仔生成技術，將你的想像力轉化為驚豔的3D公仔作品。通過簡單的文字提示，創作、分享和發現令人驚歎的AI公仔模型。專業AI公仔創作平台，讓每個公仔都成為藝術品。',
      company: '公司',
      product: '產品',
      support: '支援',
      legal: '法律',
      copyright: '© 2025 Nano Banana. 保留所有權利。',
      madeWith: '為創作者用心製作 ❤️',
      poweredBy: 'AI驅動',
      about: '關於我們',
      careers: '招聘',
      press: '新聞',
      blog: '部落格',
      features: '功能',
      pricing: '價格',
      api: 'API',
      help: '幫助中心',
      community: '社群',
      contact: '聯繫我們',
      terms: '服務條款',
      privacy: '隱私政策',
      cookies: 'Cookie政策',
      gdpr: 'GDPR',
      refundPolicy: '退款政策'
    },
    auth: {
      login: {
        title: '歡迎回來',
        subtitle: '登入您的帳戶',
        email: '電子郵件地址',
        password: '密碼',
        forgotPassword: '忘記密碼？',
        loginButton: '登入',
        loggingIn: '正在登入...',
        orContinueWith: '或繼續使用',
        noAccount: "還沒有帳戶？",
        signUp: '立即註冊',
        error: '登入時發生錯誤'
      },
      signup: {
        title: '創建帳戶',
        subtitle: '開始您的AI創作之旅',
        email: '電子郵件地址',
        password: '密碼',
        confirmPassword: '確認密碼',
        createAccount: '創建帳戶',
        creating: '正在創建帳戶...',
        orContinueWith: '或繼續使用',
        hasAccount: '已經有帳戶？',
        signIn: '立即登入',
        error: '註冊時發生錯誤',
        passwordMismatch: '密碼不匹配'
      },
      oauth: {
        error: 'OAuth登入失敗'
      },
      forgotPassword: {
        title: '忘記密碼',
        subtitle: '我們將發送重置連結到您的信箱',
        email: '電子郵件地址',
        sendButton: '發送重置連結',
        sending: '正在發送...',
        backToLogin: '返回登入',
        successMessage: '密碼重置連結已發送至您的信箱',
        errorMessage: '發送重置連結時發生錯誤'
      }
    },
    privacy: {
      badge: '隱私保護',
      title: '隱私政策',
      lastUpdated: '最後更新：2025年8月',
      section1: {
        title: '資訊收集',
        desc: '我們收集的資訊類型以及如何使用這些資訊來改善您的體驗。',
        item1: '帳戶資訊：用戶名、信箱地址和基本帳戶設定',
        item2: '使用資料：生成圖像、使用功能和互動記錄',
        item3: '技術資訊：設備資訊、瀏覽器類型和IP地址',
        item4: '支付資訊：通過安全的第三方支付處理器處理'
      },
      section2: {
        title: '資訊使用',
        desc: '我們如何使用收集的資訊來提供和改進我們的服務。',
        item1: '提供和改進AI圖像生成服務',
        item2: '個人化用戶體驗和推薦',
        item3: '處理支付和帳戶管理',
        item4: '發送服務更新和重要通知',
        item5: '確保服務安全和防止濫用'
      },
      section3: {
        title: '資訊共享',
        desc: '我們不會出售、交易或轉讓您的個人資訊給第三方，除非獲得您的明確同意或法律要求。',
        item1: '僅在您同意的情況下與第三方共享',
        item2: '與法律要求相關的必要披露',
        item3: '保護我們權利和安全的必要措施',
        item4: '與可信服務提供商的有限共享'
      },
      section4: {
        title: '資料安全',
        desc: '我們採用業界標準的安全措施來保護您的個人資訊。',
        item1: '使用SSL加密保護資料傳輸',
        item2: '定期安全審計和漏洞掃描',
        item3: '限制員工訪問個人資訊的權限',
        item4: '定期備份和災難恢復計劃'
      },
      section5: {
        title: '您的權利',
        desc: '您對個人資訊享有的權利和控制選項。',
        item1: '訪問和查看您的個人資訊',
        item2: '更正或更新不準確的資訊',
        item3: '刪除您的帳戶和相關資料',
        item4: '選擇退出行銷通訊'
      },
      section6: {
        title: '聯繫我們',
        desc: '如果您對我們的隱私政策有任何疑問或需要行使您的權利，請通過以下方式聯繫我們。',
        email: 'privacy@nanobanana.com',
        response: '我們通常在24小時內回覆您的詢問'
      }
    },
    terms: {
      badge: '服務條款',
      title: '服務條款',
      lastUpdated: '最後更新：2025年8月',
      section1: {
        title: '服務描述',
        desc: 'Nano Banana提供AI驅動的圖像生成服務，允許用戶通過文字提示創建獨特的藝術作品。我們的服務包括圖像生成、儲存和分享功能。'
      },
      section2: {
        title: '用戶責任',
        desc: '使用我們的服務時，您需要遵守以下規定：',
        item1: '不得生成違法、有害或不當內容',
        item2: '不得侵犯他人智慧財產權或隱私權',
        item3: '不得濫用服務或進行惡意攻擊',
        item4: '不得分享或傳播有害內容',
        item5: '遵守所有適用的法律法規'
      },
      section3: {
        title: '智慧財產權',
        desc: '關於生成內容和平台使用的智慧財產權規定。',
        item1: '您擁有使用我們服務生成的圖像',
        item2: '我們保留平台和技術的智慧財產權',
        item3: '不得複製或分發我們的專有技術',
        item4: '遵守第三方內容的使用許可',
        item5: '尊重原創內容的版權保護',
        item6: '不得將生成內容用於商業用途'
      },
      section4: {
        title: '服務限制',
        desc: '我們保留限制或終止服務的權利，包括但不限於：',
        item1: '違反服務條款的行為',
        item2: '惡意或濫用行為',
        item3: '技術問題或維護需求',
        item4: '法律或監管要求',
        item5: '超出合理使用範圍的行為',
        item6: '影響其他用戶體驗的行為'
      },
      section5: {
        title: '免責聲明',
        desc: '我們提供"按現狀"的服務，不提供任何明示或暗示的保證。我們不對服務中斷、資料遺失或任何直接或間接損失承擔責任。',
        item1: '服務可能因技術問題而中斷',
        item2: '生成內容的品質不保證',
        item3: '不承擔因使用服務產生的損失',
        item4: '服務可能隨時變更或終止'
      },
      section6: {
        title: '帳戶管理',
        desc: '關於帳戶創建、使用和終止的規定。',
        item1: '您必須提供真實有效的註冊資訊',
        item2: '您負責保護帳戶安全',
        item3: '我們可能暫停或終止違規帳戶',
        item4: '資料將在帳戶終止後被刪除'
      },
      section7: {
        title: '爭議解決',
        desc: '如發生爭議，我們鼓勵通過友好協商解決。如無法協商解決，爭議將根據適用法律處理。'
      },
      section8: {
        title: '法律適用',
        desc: '本服務條款受中華人民共和國法律管轄，任何爭議將提交有管轄權的人民法院解決。'
      },
      section9: {
        title: '聯繫我們',
        desc: '如果您對我們的服務條款有任何疑問或需要幫助，請通過以下方式聯繫我們。',
        email: 'legal@nanobanana.com',
        response: '我們通常在24小時內回覆您的詢問'
      },
      refundPolicy: {
        title: '退款政策',
        lastUpdated: '最後更新：2025年8月10日',
        section1: {
          title: '所有銷售均為最終交易',
          desc: '由於數位服務的即時訪問性質，一旦支付，所有訂閱費用（包括月度/年度費用）均視為最終交易，不退還。這包括但不限於：未使用的訂閱時間、帳戶使用不足、因個人原因取消訂閱、服務功能符合描述但不符合用戶預期。'
        },
        section2: {
          title: '訂閱取消',
          desc: '當您取消訂閱時：',
          items: [
            '取消僅停止未來的自動續費，不影響當前訂閱週期',
            '您的積分和服務訪問權限在當前計費週期結束前仍然有效',
            '與影片會員服務類似，您可以在訂閱週期結束前繼續使用'
          ]
        },
        section3: {
          title: '服務中斷異常處理',
          desc: '在發生重大服務中斷的情況下：',
          items: [
            '對於因非人為因素導致的持續超過72小時的服務中斷，用戶可以申請等額服務時間補償',
            '這種補償是唯一的補救措施，不涉及現金退款',
            '輕微中斷或計劃維護不構成補償條件'
          ]
        },
        section4: {
          title: '爭議解決',
          desc: '如果您對收費有任何疑問，請在7個工作日內聯繫我們：',
          items: [
            '聯繫media@nanobananamodle.com並提供交易ID',
            '提供支付憑證和問題描述',
            '我們將在15個工作日內調查並提供書面回覆',
            '所有爭議解決結果均為最終決定'
          ]
        },
        section5: {
          title: '政策修改權利',
          desc: 'nano-banana保留隨時修改此政策的權利。修改後的政策將在網站上公開發佈後立即生效。',
          highlights: [
            '您已完全理解和接受此政策',
            '您確認數位服務的特殊性質',
            '您同意放棄任何退款請求的權利'
          ]
        },
        section6: {
          title: '條款確認',
          desc: '通過支付訂閱費用，您確認已閱讀、理解和同意本退款政策中的所有條款。'
        },
        section7: {
          title: '聯繫資訊',
          desc: '如果您對此政策或帳單有任何疑問，請與我們聯繫：',
          email: 'media@nanobananamodle.com'
        }
      }
    },
    cta: {
      title: '準備好創作你的傑作了嗎？',
      subtitle: '加入已經在使用Nano Banana的數千名藝術家和創作者',
      button: '立即開始',
      badge: '今天開始創作',
      pricing: '查看價格',
      stats: {
        images: '已創建圖像',
        users: '活躍用戶',
        uptime: '運行時間',
        support: '支援服務',
      },
      testimonials: {
        averageRating: '平均評分',
        happyUsers: '滿意用戶',
        imagesGenerated: '已生成圖像',
        satisfactionRate: '滿意度',
      },
    },
    gallery: {
      title: 'AI 公仔畫廊 | 專業3D 公仔 作品展示',
      subtitle: '探索我們社群使用Nano Banana AI 公仔生成器創作的驚豔AI 公仔模型。獲得AI 公仔創作靈感並創作你自己的 公仔 傑作。每個AI 公仔都是獨特的藝術品。',
      loadMore: '載入更多作品',
      prompt: '提示詞：',
      refresh: '重新整理畫廊',
      loginRequired: '請先登入以將AI 公仔添加到您的 公仔 畫廊',
      alreadyInGallery: '此AI 公仔已在您的 公仔 畫廊中',
      addedToGallery: 'AI 公仔成功添加到您的 公仔 畫廊！',
      addFailed: 'AI 公仔添加到畫廊失敗，請重試',
      removedFromGallery: 'AI 公仔成功從您的 公仔 畫廊中移除',
      deleteImage: '刪除AI 公仔圖片',
      zoomImage: '放大查看AI 公仔',
      removeFailed: '從 公仔 畫廊移除AI 公仔失敗，請重試',
      operationFailed: 'AI 公仔操作失敗，請重試',
      promptCopied: 'AI 公仔提示詞已複製到剪貼簿！',
      copyFailed: '複製AI 公仔提示詞失敗，請重試',
      userGenerated: {
        badge: '用戶AI 公仔創作',
        title: '用戶AI 公仔生成作品',
        desc: '使用Nano Banana AI 公仔生成器創建的獨特AI 公仔模型',
        prompt: '您的AI 公仔創意提示',
        createdAt: 'AI 公仔創建於'
      },
      image1: {
        title: '神秘精靈 公仔 ',
        desc: '一個充滿發光翅膀和空靈美麗的魔法精靈 公仔 ',
      },
      image2: {
        title: '賽博朋克機器人 公仔 ',
        desc: '一個擁有霓虹細節和金屬質感的未來機器人 公仔 ',
      },
      image3: {
        title: '海洋美人魚 公仔 ',
        desc: '一個充滿活力海洋色彩的寧靜美人魚 公仔 ',
      },
      image4: {
        title: '山龍 公仔 ',
        desc: '擁有戲劇性翅膀和鱗片的雄偉龍 公仔 ',
      },
      image5: {
        title: '太空探索者 公仔 ',
        desc: '一個擁有星系主題細節的驚豔宇航員 公仔 ',
      },
      image6: {
        title: '抽象藝術 公仔 ',
        desc: '充滿流動藝術設計的 vibrant 抽象 公仔 ',
      },
      image7: {
        title: '野生動物 公仔 ',
        desc: '一個擁有詳細毛髮和特徵的雄偉動物 公仔 ',
      },
      image8: {
        title: '建築 公仔 ',
        desc: '擁有獨特幾何圖案的現代建築 公仔 ',
      },
      image9: {
        title: '復古汽車 公仔 ',
        desc: '懷舊風格中的經典復古汽車 公仔 ',
      },
      prompt1: '魔法精靈公仔，發光翅膀，空靈美麗，奇幻風格',
      prompt2: '賽博朋克機器人公仔，霓虹細節，金屬質感，未來設計',
      prompt3: '美人魚公仔，海洋色彩，寧靜美麗，水生主題',
      prompt4: '龍公仔，雄偉翅膀，戲劇性鱗片，奇幻生物',
      prompt5: '宇航員公仔，星系細節，太空探索者，宇宙主題',
      prompt6: '抽象公仔，活力色彩，流動設計，藝術風格',
      prompt7: '動物公仔，詳細毛髮，真實特徵，野生動物主題',
      prompt8: '建築公仔，幾何圖案，現代建築，城市設計',
      prompt9: '復古汽車公仔，經典設計，懷舊風格，復古主題',
      // 新增圖片的翻譯
      image10: {
        title: '薄荷水',
        desc: '清新的薄荷水，展現自然之美'
      },
      prompt10: '清新的薄荷水，展現自然之美',
      image11: {
        title: '貝殼',
        desc: '美麗的貝殼，充滿海洋魅力'
      },
      prompt11: '美麗的貝殼，充滿海洋魅力',
      image12: {
        title: '茶杯',
        desc: '優雅的茶杯，傳統韻味十足'
      },
      prompt12: '優雅的茶杯，傳統韻味十足',
      image13: {
        title: '海浪',
        desc: '動態的海浪，展現自然力量'
      },
      prompt13: '動態的海浪，展現自然力量',
      image14: {
        title: '海鷗',
        desc: '優雅的海鷗，翱翔在海洋上空'
      },
      prompt14: '優雅的海鷗，翱翔在海洋上空',
      image15: {
        title: '荷葉',
        desc: '清新的荷葉，展現自然之美'
      },
      prompt15: '清新的荷葉，展現自然之美',
      image16: {
        title: '建築',
        desc: '現代建築，充滿城市魅力'
      },
      prompt16: '現代建築，充滿城市魅力',
      image17: {
        title: '江南',
        desc: '傳統江南水鄉風光'
      },
      prompt17: '傳統江南水鄉風光',
      image18: {
        title: '舊巷子',
        desc: '懷舊的舊巷子，充滿歷史韻味'
      },
      prompt18: '懷舊的舊巷子，充滿歷史韻味',
      image19: {
        title: '橘子',
        desc: '新鮮的橘子，展現自然之美'
      },
      prompt19: '新鮮的橘子，展現自然之美',
      image20: {
        title: '螞蟻',
        desc: '微小的螞蟻，展現自然細節'
      },
      prompt20: '微小的螞蟻，展現自然細節',
      image21: {
        title: '蜻蜓',
        desc: '優雅的蜻蜓，展現自然之美'
      },
      prompt21: '優雅的蜻蜓，展現自然之美',
      image22: {
        title: '蜻蜓眼睛',
        desc: '詳細的蜻蜓眼睛，展現自然之美'
      },
      prompt22: '詳細的蜻蜓眼睛，展現自然之美',
      image23: {
        title: '小蘑菇',
        desc: '可愛的小蘑菇，充滿自然魅力'
      },
      prompt23: '可愛的小蘑菇，充滿自然魅力'
    },
    draw: {
      prompt: 'AI 公仔生成自提示詞：',
      heroExamplePrompt: '粉色頭髮的可愛動漫女孩AI 公仔',
      title: '專業AI 公仔生成器 | 3D 公仔 創作工具',
      subtitle: '使用我們先進的AI 公仔生成技術，將你的想法轉化為驚豔的3D 公仔 模型。專業AI 公仔創作平台，讓每個 公仔 都成為藝術品。',
      promptPlaceholder: '描述你想要創建的AI 公仔...',
      styleLabel: 'AI 公仔風格',
      sizeLabel: 'AI 公仔模型尺寸',
      generateButton: '生成AI 公仔',
      generating: 'AI 公仔生成中...',
      downloadButton: '下載AI 公仔',
      favoriteButton: '收藏AI 公仔',
      regenerateButton: '重新生成AI 公仔',
      successMessage: 'AI 公仔生成成功！',
      errorMessage: 'AI 公仔生成失敗，請重試',
      waitingForGeneration: '等待AI 公仔生成',
      success: 'AI 公仔生成成功',
      describeYourIdea: '描述你的AI 公仔創意',
      describeYourIdeaDesc: '詳細描述你想要生成的AI 公仔內容，讓AI 公仔生成器理解你的創作需求',
      result: 'AI 公仔生成結果',
      enterPromptAndClick: '輸入AI 公仔提示詞並點擊生成按鈕',
      styleRealistic: '🎭 寫實風格 - 逼真的AI 公仔效果',
      styleAnime: '🎌 動漫風格 - 日式動漫AI 公仔',
      styleOilPainting: '🖼️ Q版風格 - 可愛的Q版AI 公仔',
      styleWatercolor: '💧 奇幻風格 - 奇幻生物AI 公仔',
      styleSketch: '✏️ 簡約風格 - 極簡AI 公仔設計',
      sizeSquare: '⬜ 小型',
      sizePortrait: '📱 中型',
      sizeLandscape: '🖥️ 大型',
      sizeWidescreen: '🎬 超大',
      sizeMobilePortrait: '📱 迷你',
      tip: '提示：描述越詳細，生成的AI 公仔越符合你的想像。讓AI 公仔生成器理解你的創作需求。',
      costCredits: 'AI 公仔生成消耗 {credits} 積分',
      loginRequired: '請先登入',
      loginRequiredDesc: '登入後才能使用AI 公仔生成功能，開始你的AI 公仔創作之旅',
      cancel: '取消AI 公仔生成',
      goToLogin: '去登入',
      generatedImage: '生成的AI 公仔',
      generationFailed: 'AI 公仔生成失敗',
      insufficientCredits: '積分不足，請先充值',
      creditConsumeError: 'AI公仔生成積分消耗失敗，請重試',
      addedToGallery: 'AI公仔已自動添加到您的公仔畫廊！',
      alreadyInGallery: '此AI公仔已存在於您的公仔畫廊中',
      addToGallery: '添加AI公仔到畫廊',
      removedFromGallery: 'AI公仔已從您的公仔畫廊中移除',
      operationFailed: 'AI公仔操作失敗，請重試',
      // 新增提示資訊
      addToGalleryHint: '點擊愛心按鈕添加AI公仔到畫廊',
      removeFromGalleryHint: '點擊愛心按鈕從公仔畫廊中移除AI公仔',
      imageSaved: 'AI公仔已儲存，點擊愛心按鈕展示到公仔畫廊',
      // 圖片上傳相關
      uploadImage: '上傳AI公仔參考圖片',
      uploadImageDesc: '上傳一張圖片，基於此圖片生成AI公仔',
      clickToUpload: '點擊上傳AI公仔參考圖片',
      supportedFormats: '支援 JPG、PNG、WebP 格式（最大10MB）',
      optionalPrompt: 'AI公仔可選描述',
      imageRequired: '請上傳一張AI公仔參考圖片',
      invalidFileType: '請上傳有效的AI公仔圖片檔案',
      fileTooLarge: 'AI公仔檔案過大（最大10MB）',
      uploadTip: '上傳清晰的AI公仔參考圖片以獲得最佳效果',
    },
    about: {
      badge: '關於Nano Banana AI 公仔生成器',
      title: '革新AI 公仔創作 | 專業3D 公仔 製作平台',
      subtitle: 'Nano Banana AI 公仔生成器處於AI驅動3D 公仔 創意的前沿，賦能藝術家、設計師和創作者，通過尖端人工智慧技術將最狂野的想像力變為現實的AI 公仔作品。',
      mission: {
        title: '我們的AI公仔使命',
        desc: '通過讓專業級AI 3D公仔模型生成技術為每個人所用，實現AI公仔創作的民主化。我們相信AI公仔創意應該沒有界限，技術應該放大人類想像力，讓每個公仔都成為藝術品。',
      },
      vision: {
        title: '我們的AI公仔願景',
        desc: '一個任何人都能在幾秒鐘內創作驚豔3D AI公仔的世界，想法從腦海自由流向3D公仔模型，AI公仔生成器成為人類表達和創新的終極創意夥伴。',
      },
      feature1: {
        title: '先進AI公仔技術',
        desc: '由最先進的機器學習模型驅動，提供高品質、創意和獨特的3D AI公仔生成。每個AI公仔都經過精心優化。',
      },
      feature2: {
        title: '以用戶為中心的AI公仔設計',
        desc: '為所有技能水平的AI公仔創作者設計的直觀介面，從初學者到專業3D公仔藝術家和設計師。',
      },
      feature3: {
        title: 'AI公仔隱私與安全',
        desc: '企業級安全措施，保護您的AI公仔創意作品，確保您的AI公仔智慧財產權安全。',
      },
      stats: {
        images: '已創建AI公仔',
        users: 'AI公仔活躍用戶',
        uptime: 'AI公仔運行時間',
        support: 'AI公仔支援服務',
      },
      values: {
        title: '我們的價值觀',
        subtitle: '這些核心原則指導我們在Nano Banana所做的一切',
        value1: {
          title: '卓越',
          desc: '我們在服務的每個方面都追求卓越，從AI品質到用戶體驗。',
        },
        value2: {
          title: '創意',
          desc: '我們慶祝和培養創意，相信它是人類進步的基礎。',
        },
        value3: {
          title: '社群',
          desc: '我們建立並支援一個充滿活力的創作者、藝術家和創新者社群。',
        },
      },
    },
    pricing: {
      title: '選擇您的AI公仔套餐',
      subtitle: '基於積分的靈活定價，每次AI公仔生成僅需10積分。專業AI公仔創作平台，讓每個公仔都成為藝術品。',
      creditInfo: '每次AI公仔生成消耗 10 積分，專業3D公仔製作服務',
      basic: '基礎套餐',
      advanced: '進階套餐',
      professional: '專業套餐',
      price: '價格',
      oneTime: '/ 一次性',
      credits: '積分',
      generations: '次生成',
      features: {
        basic: [
          '500 積分',
          '50 次AI公仔生成',
          '基礎AI公仔模型品質',
          '標準AI公仔客服支援',
          '7天AI公仔退款保證'
        ],
        advanced: [
          '1000 積分',
          '100 次AI公仔生成',
          '高清AI公仔模型品質',
          '優先AI公仔客服支援',
          '30天AI公仔退款保證',
          '專屬AI公仔風格'
        ],
        professional: [
          '3000 積分',
          '300 次AI公仔生成',
          '超高清AI公仔模型品質',
          '24/7 專屬AI公仔客服',
          '90天AI公仔退款保證',
          '專屬AI公仔風格',
          '批量AI公仔生成功能',
          'AI公仔API 訪問權限'
        ]
      },
      popular: '最受歡迎',
      buyNow: '立即購買',
      whyChoose: '為什麼選擇我們的AI 公仔積分系統？',
      benefits: {
        flexible: {
          title: 'AI 公仔靈活使用',
          desc: 'AI 公仔積分永久有效，隨時使用，不設時間限制'
        },
        transparent: {
          title: 'AI 公仔透明定價',
          desc: '每次AI 公仔生成固定10積分，價格清晰明了'
        },
        value: {
          title: 'AI 公仔高性價比',
          desc: '相比按次付費，AI 公仔積分套餐更經濟實惠'
        }
      },
      contact: '還有AI公仔疑問？聯繫我們獲取更多資訊',
      startCreating: '開始AI公仔創作',
      contactSupport: '聯繫AI公仔客服',
      loginRequired: '請登入繼續',
      loginRequiredMessage: '您未登入，請先登入後再進行AI 公仔支付',
    },
    profile: {
      title: 'AI 公仔個人資料',
      subtitle: '管理您的AI 公仔帳戶資訊和查看AI 公仔使用統計',
      pleaseLogin: '請先登入',
      goToLogin: '去登入',
      loginRequired: '需要登入',
      loginToView: '請登入以查看您的AI公仔個人資料',
      username: 'AI公仔用戶名',
      userEmail: 'AI公仔用戶信箱',
      userPoints: 'AI公仔用戶積分',
      freeAttempts: 'AI公仔免費嘗試次數',
      verifiedUser: '已驗證AI公仔用戶',
      accountSettings: 'AI公仔帳戶設定',
      startAICreation: '開始AI公仔創作',
      startGenerating: '開始AI公仔生成',
      viewGallery: '查看AI公仔畫廊',
      buyCredits: '購買AI公仔積分',
      memberSince: 'AI公仔註冊時間',
      aiGenerations: 'AI公仔生成次數',
      usedThisMonth: '本月AI公仔已使用',
      collectedWorks: '收藏AI公仔',
      collectedWorksDesc: '已收藏AI公仔',
      membershipLevel: 'AI公仔會員等級',
      advancedUser: 'AI公仔高級用戶',
      premiumUser: 'AI公仔高級用戶',
      creditsOverview: 'AI公仔積分概覽',
      availableCredits: 'AI公仔可用積分',
      creditsDescription: '用於AI公仔生成的積分',
      remainingGenerations: 'AI公仔剩餘生成次數',
      creditsValue: 'AI公仔積分價值',
      buyMoreCredits: '購買更多AI公仔積分',
      aiGenerationHistory: 'AI公仔生成記錄',
      imageGeneration: 'AI公仔生成',
      credits: 'AI公仔積分',
      noGenerationsYet: '還沒有AI公仔生成記錄',
      // 新增翻譯
      welcomeBack: '歡迎回來！',
      currentCredits: '當前積分',
      totalEarned: '累計獲得',
      totalSpent: '累計消費',
      transactionHistory: '交易記錄',
      consumption: '消費',
      recharge: '充值',
      generationResult: '生成結果',
      creditRecharge: '積分充值',
      packagePurchase: '套餐購買',
      noTransactionRecords: '暫無交易記錄',
      purchaseCredits: '購買積分',
      // 套餐相關翻譯
      basicPackage: '基礎套餐',
      advancedPackage: '進階套餐',
      professionalPackage: '專業套餐',
      rechargePoints: '充值積分',
      // 新用戶贈送積分翻譯
      newUserGift: '新用戶贈送積分',
      // 贈送類型翻譯
      gift: '贈送'
    },
    // 懸浮球支援翻譯
    floating_support: {
      title: '需要幫助？',
      message: '如果您在使用過程中遇到任何問題，請通過郵件聯繫我們，我們會盡快幫您解決！',
      close: '關閉',
      customer_service_email: '客服信箱',
      click_to_send: '點擊發送郵件',
      response_time: '我們通常在24小時內回覆'
    },
    caseStudy: {
      title: '一個設計，一套AI公仔',
      subtitle: '同一張人物圖片可以生成一套完整的AI公仔系列，包含多種AI公仔風格和姿態',
      originalTitle: '原始AI公仔人物設計',
      originalDesc: '輸入的AI公仔人物參考圖片',
      conclusion: {
        title: '🎨 一套AI公仔，多種可能',
        desc: '通過AI公仔生成技術，您可以將任何人物圖片轉換為一套完整的AI公仔系列。無論是動漫公仔、寫實公仔、奇幻公仔還是機甲公仔風格，都能生成配套的AI公仔收藏品，讓您的創意想法變成現實的AI公仔系列。'
      }
    },
    aiFigurine: {
      title: '生成AI公仔 - 讓想像變為現實',
      subtitle: '使用最先進的AI技術，將您的創意想法轉化為精美的3D公仔模型。無論是動漫角色、遊戲人物還是原創設計，都能在幾秒鐘內生成獨一無二的AI公仔。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '立即開始製作您的AI公仔',
      keywords: {
        aiFigurine: 'AI公仔生成',
        d3dFigurine: '3D公仔製作',
        aiModeling: '人工智能建模',
        smartDesign: '智能公仔設計',
        aiHandmade: 'AI手辦製作',
        digitalFigurine: '數字公仔生成',
        mlModeling: '機器學習建模',
        smart3dPrint: '智能3D打印'
      },
      examples: {
        anime: {
          title: '動漫風格公仔',
          desc: '精美的動漫風格AI公仔，細節豐富，色彩鮮豔'
        },
        realistic: {
          title: '寫實風格公仔',
          desc: '逼真的寫實風格AI公仔，質感細膩，栩栩如生'
        },
        qversion: {
          title: 'Q版可愛公仔',
          desc: '萌趣的Q版AI公仔，造型可愛，充滿童趣'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是AI公仔生成？',
          desc1: 'AI公仔生成是一種革命性的技術，它利用人工智能和機器學習算法，將文字描述或圖片輸入轉化為精美的3D公仔模型。這項技術結合了計算機視覺、自然語言處理和3D建模技術，能夠在極短的時間內創造出獨特、個性化的公仔設計。通過AI智能建模、深度學習算法和自動化設計，用戶可以輕鬆實現從創意到成品的快速轉換。',
          desc2: '通過AI公仔生成技術，用戶可以輕鬆創建各種風格的公仔，包括動漫風格、寫實風格、卡通風格、科幻風格等。無論是想要一個可愛的寵物公仔、一個酷炫的超級英雄公仔，還是一個充滿創意的原創角色公仔，AI都能根據您的描述快速生成符合要求的3D模型。這種智能公仔製作技術為數字雕塑、虛擬手辦、AI手辦製作等領域帶來了全新的可能性。'
        },
        advantages: {
          title: 'AI公仔生成的技術優勢',
          smart: '智能理解',
          smartDesc: 'AI能夠準確理解您的文字描述，捕捉每一個細節要求',
          fast: '快速生成',
          fastDesc: '幾秒鐘內就能生成完整的3D公仔模型，無需等待',
          quality: '高質量輸出',
          qualityDesc: '生成的公仔模型具有高精度和豐富的細節表現',
          creative: '無限創意',
          creativeDesc: '支持各種創意風格，讓您的想像力得到充分釋放'
        },
        applications: {
          title: 'AI公仔生成的應用場景',
          personal: '個人收藏',
          personalDesc: '創建獨特的個人收藏公仔，展現個人品味和喜好',
          commercial: '商業用途',
          commercialDesc: '為遊戲、動漫、影視作品設計角色公仔，提升品牌價值',
          education: '教育學習',
          educationDesc: '幫助學生理解3D建模概念，培養創意思維能力',
          gift: '禮品定制',
          giftDesc: '為親朋好友定制專屬 公仔 ，表達心意和關懷'
        },
        howToUse: {
          title: '如何使用AI公仔生成？',
          step1: '上傳圖片或輸入描述',
          step1Desc: '上傳您想要製作成公仔的圖片，或者用文字詳細描述您想要的公仔外觀',
          step2: '選擇風格和參數',
          step2Desc: '選擇 公仔 的風格類型、尺寸大小、顏色偏好等參數設置',
          step3: 'AI智能生成',
          step3Desc: 'AI系統自動分析您的輸入，生成符合要求的3D 公仔 模型',
          step4: '下載和分享',
          step4Desc: '預覽生成的 公仔 模型，滿意後下載3D文件或分享給朋友'
        },
        future: {
          title: 'AI公仔生成的未來展望',
          desc1: '隨著人工智能技術的不斷發展，AI公仔生成將變得更加智能化和個性化。未來的AI公仔生成系統將能夠更好地理解用戶的情感需求，生成更加符合用戶期望的公仔設計。同時，隨著3D打印技術的普及，用戶將能夠輕鬆地將AI生成的公仔模型轉化為真實的實體公仔。',
          desc2: '此外，AI公仔生成技術還將與虛擬現實、增強現實等技術結合，為用戶提供更加沉浸式的體驗。用戶將能夠在虛擬世界中與AI生成的公仔進行互動，甚至可以通過手勢控制來調整公仔的外觀和動作。',
          desc3: '總的來說，AI公仔生成技術為創意產業帶來了新的機遇和挑戰。它不僅降低了3D建模的門檻，讓更多人能夠參與到創意設計中來，同時也為傳統的手辦製作、遊戲開發、影視製作等行業提供了新的工具和可能性。'
        }
      }
    },
    generateFigurine: {
      title: '生成 公仔 - 創意無限，一鍵實現',
      subtitle: '通過先進的AI技術，將您的創意想法轉化為精美的3D公仔模型。無論是動漫角色、遊戲人物還是原創設計，都能在幾秒鐘內生成獨一無二的公仔作品。',
      cta: '立即上傳圖片製作AI 公仔 ',
      ctaEnd: '立即開始生成您的專屬公仔',
      keywords: {
        generator: ' 公仔 生成器',
        d3dModel: '3D模型製作',
        digitalSculpture: '數字雕塑',
        virtualFigurine: '虛擬公仔',
        customFigurine: '公仔定制',
        smartModeling: '智能建模',
        creativeFigurine: '創意公仔',
        designSoftware: '公仔設計軟件'
      },
      examples: {
        scifi: {
          title: '科幻風格公仔',
          desc: '未來感十足的科幻風格公仔，設計前衛，細節精緻'
        },
        fantasy: {
          title: '奇幻風格公仔',
          desc: '充滿魔幻色彩的奇幻風格公仔，造型獨特，富有想像力'
        },
        retro: {
          title: '復古風格公仔',
          desc: '懷舊復古風格公仔，充滿年代感，設計經典'
        }
      },
      sections: {
        technology: {
          title: '公仔生成技術詳解',
          desc1: '公仔生成技術是一種結合了人工智能、計算機視覺和3D建模的先進技術。它能夠根據用戶的輸入（文字描述或圖片）自動生成高質量的3D公仔模型。這項技術的核心在於深度學習和神經網絡算法，能夠理解和分析複雜的視覺信息，並將其轉化為精確的3D幾何結構。通過智能建模系統、數字雕塑技術和虛擬公仔製作，用戶可以輕鬆實現創意公仔的快速生成。',
          desc2: '現代的公仔生成系統通常採用生成對抗網絡（GAN）和變分自編碼器（VAE）等先進的機器學習模型。這些模型經過大量3D模型數據的訓練，能夠學習到不同風格、不同主題公仔的特徵模式，從而生成符合用戶需求的個性化公仔設計。這種公仔定制技術、智能建模算法和創意公仔設計系統為公仔製作行業帶來了革命性的變化。',
          desc3: '公仔生成技術的優勢在於其高度的自動化和智能化。用戶無需具備專業的3D建模技能，只需要提供簡單的描述或參考圖片，系統就能自動生成複雜的3D模型。這不僅大大降低了創作門檻，也大大提高了創作效率，讓更多人能夠參與到創意設計中來。通過公仔設計軟件、智能建模工具和數字雕塑平台，用戶可以輕鬆實現從概念到成品的完整創作流程。'
        },
        coreFeatures: {
          title: '公仔生成的核心功能',
          smartRecognition: {
            title: '智能識別',
            desc: '自動識別圖片中的關鍵特徵，準確提取公仔設計元素'
          },
          preciseModeling: {
            title: '精準建模',
            desc: '基於輸入信息生成高精度的3D幾何模型'
          },
          styleTransfer: {
            title: '風格轉換',
            desc: '支持多種藝術風格的轉換，滿足不同審美需求'
          },
          multiFormat: {
            title: '多格式輸出',
            desc: '支持多種3D文件格式，兼容主流建模軟件'
          }
        },
        applications: {
          title: '公仔生成的應用領域',
          gameDev: {
            title: '遊戲開發',
            desc: '為遊戲角色設計提供快速的原型製作方案，加速遊戲開發流程'
          },
          filmProduction: {
            title: '影視製作',
            desc: '為動畫電影、電視劇提供角色設計參考，提升製作效率'
          },
          figureMaking: {
            title: '手辦製作',
            desc: '為手辦製造商提供設計原型，降低開發成本'
          },
          education: {
            title: '教育培訓',
            desc: '幫助學生理解3D建模概念，培養創意思維和設計能力'
          },
          personalCreation: {
            title: '個人創作',
            desc: '為個人創作者提供便捷的3D建模工具，實現創意想法'
          }
        },
        workflow: {
          title: '公仔生成的技術流程',
          dataPreprocessing: {
            title: '數據預處理',
            desc: '對輸入的圖片或文字進行預處理，提取關鍵特徵信息'
          },
          featureAnalysis: {
            title: '特徵分析',
            desc: '使用深度學習算法分析輸入特徵，理解設計意圖'
          },
          d3dModeling: {
            title: '3D建模',
            desc: '基於分析結果生成3D幾何模型，包括形狀、紋理、顏色等'
          },
          qualityOptimization: {
            title: '質量優化',
            desc: '對生成的模型進行質量檢查和優化，確保輸出質量'
          },
          formatConversion: {
            title: '格式轉換',
            desc: '將3D模型轉換為標準格式，便於後續使用和分享'
          }
        },
        advantages: {
          title: '公仔生成的優勢特點',
          technicalAdvantages: {
            title: '技術優勢',
            items: [
              '高度自動化，減少人工干預',
              '生成速度快，幾秒鐘完成',
              '質量穩定，輸出一致性好',
              '支持多種輸入格式'
            ]
          },
          applicationAdvantages: {
            title: '應用優勢',
            items: [
              '降低創作門檻，人人可用',
              '提高創作效率，節省時間',
              '激發創意靈感，拓展思路',
              '支持個性化定制'
            ]
          }
        },
        future: {
          title: '公仔生成的未來發展趨勢',
          desc1: '隨著人工智能技術的不斷進步，公仔生成技術將朝著更加智能化和個性化的方向發展。未來的公仔生成系統將能夠更好地理解用戶的情感需求和審美偏好，生成更加符合用戶期望的公仔設計。同時，隨著虛擬現實和增強現實技術的發展，用戶將能夠在虛擬世界中實時預覽和調整公仔設計。',
          desc2: '此外，公仔生成技術還將與3D打印技術更加緊密地結合，用戶將能夠輕鬆地將AI生成的公仔模型轉化為真實的實體公仔。這將為個人收藏、商業展示、教育培訓等領域帶來新的可能性。',
          desc3: '總的來說，公仔生成技術代表了創意產業數字化發展的重要方向。它不僅為傳統的手辦製作、遊戲開發等行業提供了新的工具和方法，也為個人創作者提供了更多表達創意的機會。隨著技術的不斷成熟和普及，公仔生成將成為創意設計領域不可或缺的重要工具。'
        }
      }
    },
    nanoBananaModel: {
      title: 'NanoBanana模型公仔AI - 革命性AI技術',
      subtitle: 'NanoBanana模型公仔AI採用最先進的深度學習技術，能夠將您的創意想法轉化為精美的3D 公仔 模型。我們的AI系統經過大量數據訓練，具備強大的理解和生成能力。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗NanoBanana模型AI公仔生成',
      keywords: {
        nanoBanana: 'NanoBanana AI',
        deepLearning: '深度學習模型',
        neuralNetwork: '神經網絡公仔 ',
        aiAlgorithm: 'AI算法建模',
        mlFigurine: '機器學習公仔 ',
        smartSystem: '智能公仔系統',
        aiTraining: 'AI模型訓練',
        autoModeling: '自動化建模'
      },
      examples: {
        smartRecognition: {
          title: '智能識別模型',
          desc: '基於NanoBanana AI的智能識別，精準捕捉設計細節'
        },
        deepLearning: {
          title: '深度學習生成',
          desc: '運用深度學習算法，生成高質量3D公仔模型'
        },
        multiStyle: {
          title: '多風格適配',
          desc: '支持多種藝術風格，滿足不同創作需求'
        }
      },
      sections: {
        architecture: {
          title: 'NanoBanana模型公仔AI技術架構',
          desc1: 'NanoBanana模型公仔AI是一個基於深度學習的先進AI系統，專門用於生成高質量的3D公仔模型。該系統採用了最新的生成對抗網絡（GAN）技術，結合變分自編碼器（VAE）和注意力機制，能夠準確理解用戶的輸入需求並生成符合要求的3D模型。通過神經網絡公仔生成、AI算法建模和機器學習公仔技術，NanoBanana模型實現了智能公仔系統的突破性進展。',
          desc2: '我們的AI模型經過了數百萬張3D模型圖片的訓練，涵蓋了各種風格、主題和類型的公仔設計。這使得NanoBanana模型能夠理解複雜的視覺特徵，包括形狀、紋理、顏色、比例等，並能夠將這些特徵準確地轉化為3D幾何結構。通過深度學習模型訓練、AI模型訓練和自動化建模技術，我們的智能公仔系統能夠實現前所未有的精度和效率。',
          desc3: 'NanoBanana模型的核心優勢在於其強大的泛化能力和創造性。它不僅能夠複製現有的設計風格，還能夠根據用戶的創意需求生成全新的、獨特的公仔設計。這種創造性使得每個生成的公仔都具有獨特的個性，滿足用戶的個性化需求。通過AI算法建模、智能公仔系統和機器學習公仔技術，NanoBanana模型為AI手辦製作、數字公仔生成和智能3D打印領域帶來了革命性的變化。'
        },
        features: {
          title: 'NanoBanana模型的核心特性',
          smartUnderstanding: {
            title: '智能理解',
            desc: '基於自然語言處理技術，準確理解用戶的文字描述'
          },
          efficientProcessing: {
            title: '高效處理',
            desc: '採用GPU加速技術，實現快速模型生成'
          },
          preciseModeling: {
            title: '精準建模',
            desc: '生成高精度的3D幾何模型，細節豐富'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備創造性思維，能夠生成獨特的原創設計'
          }
        },
        advantages: {
          title: 'NanoBanana模型的技術優勢',
          advanced: '先進算法',
          advancedDesc: '採用最新的深度學習算法，確保生成質量',
          fast: '快速生成',
          fastDesc: '優化的計算架構，實現秒級模型生成',
          accurate: '高精度輸出',
          accurateDesc: '生成模型具有極高的幾何精度和細節表現',
          flexible: '靈活適配',
          flexibleDesc: '支持多種輸入格式和輸出需求'
        },
        applications: {
          title: 'NanoBanana模型的應用場景',
          commercial: {
            title: '商業應用',
            items: [
              '遊戲角色設計',
              '動漫IP開發',
              '手辦原型製作',
              '影視特效製作'
            ]
          },
          personal: {
            title: '個人創作',
            items: [
              '個人收藏製作',
              '創意設計探索',
              '藝術創作輔助',
              '學習3D建模'
            ]
          }
        },
        workflow: {
          title: 'NanoBanana模型的工作流程',
          inputParsing: {
            title: '輸入解析',
            desc: 'NanoBanana AI系統解析用戶的輸入信息，包括文字描述、圖片特徵等'
          },
          featureExtraction: {
            title: '特徵提取',
            desc: '使用深度學習算法提取關鍵特徵，理解用戶的設計意圖'
          },
          modelGeneration: {
            title: '模型生成',
            desc: '基於提取的特徵生成3D幾何模型，包括形狀、紋理、顏色等'
          },
          qualityOptimization: {
            title: '質量優化',
            desc: '對生成的模型進行質量檢查和優化，確保輸出符合標準'
          },
          outputDelivery: {
            title: '輸出交付',
            desc: '將優化後的3D模型轉換為標準格式，供用戶下載使用'
          }
        },
        innovation: {
          title: 'NanoBanana模型的創新突破',
          desc1: 'NanoBanana模型在AI 公仔生成領域實現了多項技術突破。首先，我們採用了最新的多模態學習技術，能夠同時處理文字、圖片、語音等多種輸入方式，大大提升了用戶交互的便利性。其次，我們引入了注意力機制和自注意力網絡，使得模型能夠更好地理解複雜的語義關係和空間結構。',
          desc2: '此外，NanoBanana模型還採用了對抗訓練和強化學習技術，通過不斷的自我優化和反饋學習，持續提升生成質量。我們的模型不僅能夠生成靜態的3D模型，還能夠生成動態的動畫序列，為 公仔 設計增添了更多可能性。',
          desc3: '最重要的是，NanoBanana模型具備強大的創造性和適應性。它能夠根據用戶的個性化需求調整生成策略，創造出真正符合用戶期望的獨特 公仔 設計。這種個性化能力使得每個用戶都能獲得獨一無二的創作體驗。'
        },
        future: {
          title: 'NanoBanana模型的未來展望',
          desc1: '隨著人工智能技術的不斷發展，NanoBanana模型將繼續進化和升級。我們計劃在未來版本中集成更多的AI技術，包括自然語言理解、計算機視覺、語音識別等，為用戶提供更加智能和便捷的創作體驗。',
          desc2: '同時，我們也將探索與虛擬現實、增強現實等新興技術的結合，讓用戶能夠在虛擬世界中實時預覽和調整 公仔 設計。這將為創意設計帶來全新的交互方式和體驗模式。',
          desc3: '總的來說，NanoBanana模型代表了AI 公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，NanoBanana模型將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    figurineCommand: {
      title: '公仔指令 - 精準控制AI創作',
      subtitle: '掌握公仔指令，讓您能夠精準控制AI生成過程，創造出更符合您期望的3D公仔模型。通過專業的指令技巧，實現從簡單描述到複雜設計的完美轉換。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '立即使用AI指令製作公仔',
      keywords: {
        commandControl: '指令控制',
        parameterAdjust: '參數調節',
        smartSystem: '智能系統',
        creationControl: '創作控制',
        customCommand: '定制指令',
        modelingCommand: '建模指令'
      },
      examples: {
        basic: {
          title: '基礎指令控制',
          desc: '掌握基礎AI指令，實現基本的公仔生成控制'
        },
        advanced: {
          title: '高級指令技巧',
          desc: '運用高級指令技巧，實現複雜的公仔設計需求'
        },
        professional: {
          title: '專業指令應用',
          desc: '專業級AI指令應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是公仔指令？',
          desc1: '公仔指令是一種專門用於控制AI生成3D公仔模型的指令系統。通過精確的指令語言，用戶可以詳細描述公仔的外觀、風格、材質、姿態等各個方面，讓AI系統按照用戶的具體要求生成符合預期的3D模型。',
          desc2: '與傳統的文字描述不同，公仔指令 採用了結構化的指令格式，能夠更準確地傳達用戶的創作意圖。每個指令都經過精心設計，能夠控制公仔的特定屬性，如顏色、紋理、形狀、比例等，確保生成結果與用戶期望高度一致。',
          desc3: ' 公仔指令 系統不僅支持單一屬性的控制，還能夠通過指令組合實現複雜的創作需求。用戶可以同時使用多個指令來創造獨特的公仔設計，從簡單的角色定制到複雜的場景創作，都能通過指令系統輕鬆實現。'
        },
        coreFeatures: {
          title: '公仔指令的核心功能',
          preciseControl: {
            title: '精確控制',
            desc: '通過指令精確控制公仔的每個細節特徵'
          },
          flexibleCombination: {
            title: '靈活組合',
            desc: '支持多個指令的組合使用，實現複雜設計'
          },
          smartUnderstanding: {
            title: '智能理解',
            desc: 'AI系統能夠準確理解指令的語義和意圖'
          },
          fastResponse: {
            title: '快速響應',
            desc: '指令執行速度快，實時生成結果'
          }
        },
        commandTypes: {
          title: ' 公仔指令 類型',
          appearance: {
            title: '外觀指令',
            desc: '控制公仔的外觀特徵，包括顏色、紋理、材質等',
            example: '--color:blue --texture:metallic --style:anime'
          },
          style: {
            title: '風格指令',
            desc: '指定公仔的藝術風格和設計方向',
            example: '--style:realistic --mood:cute --theme:fantasy'
          },
          material: {
            title: '材質指令',
            desc: '定義公仔的表面材質和質感效果',
            example: '--material:ceramic --finish:glossy --detail:high'
          },
          pose: {
            title: '姿態指令',
            desc: '控制公仔的動作姿態和表情',
            example: '--pose:standing --expression:happy --action:waving'
          }
        },
        advancedTechniques: {
          title: '高級指令技巧',
          weightControl: {
            title: '權重控制',
            desc: '通過權重參數調整不同指令的影響程度',
            example: '--color:blue:0.8 --style:anime:0.6'
          },
          negativeCommand: {
            title: '否定指令',
            desc: '使用否定指令排除不需要的特徵',
            example: '--no:hat --no:glasses --avoid:dark'
          },
          combinationCommand: {
            title: '組合指令',
            desc: '將多個指令組合使用，創造複雜效果',
            example: '--style:anime + --color:rainbow + --pose:dancing'
          },
          referenceCommand: {
            title: '參考指令',
            desc: '基於參考圖片或模型進行指令優化',
            example: '--reference:image.jpg --adapt:style --enhance:details'
          }
        },
        optimizationStrategies: {
          title: '指令優化策略',
          writingTips: {
            title: '指令編寫技巧',
            items: [
              '使用簡潔明確的指令語言',
              '避免矛盾的指令組合',
              '合理使用權重參數',
              '測試不同指令組合效果'
            ]
          },
          debuggingMethods: {
            title: '調試方法',
            items: [
              '逐步添加指令測試效果',
              '使用否定指令排除問題',
              '調整權重參數優化結果',
              '參考成功案例學習技巧'
            ]
          }
        },
        practicalExamples: {
          title: '實用指令示例',
          anime: {
            title: '動漫風格公仔',
            example: '--style:anime --color:vibrant --pose:dynamic --mood:energetic'
          },
          scifi: {
            title: '科幻主題公仔',
            example: '--theme:scifi --material:metallic --color:silver --pose:futuristic'
          },
          realistic: {
            title: '寫實風格公仔',
            example: '--style:realistic --texture:detailed --color:natural --pose:casual'
          }
        },
        futureDevelopment: {
          title: ' 公仔指令 的未來發展',
          desc1: '隨著人工智能技術的不斷發展， 公仔指令 系統也將變得更加智能和人性化。未來的AI指令將支持更自然的語言表達，用戶可以用更口語化的方式描述需求，AI系統能夠自動理解和優化指令內容。',
          desc2: '同時，AI指令系統還將支持多模態輸入，用戶可以通過語音、手勢、甚至思維來控制AI生成過程。這將大大降低使用門檻，讓更多人能夠輕鬆掌握AI創作技巧。',
          desc3: '此外，AI指令系統還將具備學習能力，能夠根據用戶的使用習慣和偏好自動優化指令建議，為用戶提供更加個性化的創作體驗。這將使得AI創作變得更加智能和高效，為創意產業帶來新的發展機遇。'
        }
      }
    },
    geminiAIFigurine: {
      title: 'GeminiAI公仔 - 革命性AI技術',
      subtitle: 'Gemini AI公仔採用Google最先進的多模態AI技術，能夠將您的創意想法轉化為精美的3D公仔模型。我們的AI系統具備強大的理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗GeminiAI公仔生成',
      keywords: {
        geminiAI: 'Gemini AI',
        googleAI: 'Google AI',
        multiModal: '多模態AI',
        advancedModel: '先進模型',
        creativeAI: '創意AI',
        smartGeneration: '智能生成'
      },
      examples: {
        creative: {
          title: '創意AI生成',
          desc: '基於Gemini AI的創意生成，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級AI技術',
          desc: '運用Google先進AI技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業AI應用',
          desc: '專業級Gemini AI應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是GeminiAI公仔？',
          desc1: 'GeminiAI公仔是基於Google Gemini多模態AI技術開發的先進公仔生成系統。該系統能夠理解文字、圖片、語音等多種輸入方式，並生成高質量的3D公仔模型。Gemini AI具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的AI生成系統不同，GeminiAI公仔採用了最新的多模態學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: ' GeminiAI公仔 還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: ' GeminiAI公仔 的核心特性',
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          advancedProcessing: {
            title: '先進處理',
            desc: '採用Google最新的AI處理技術，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'GeminiAI公仔的技術架構',
          desc1: 'GeminiAI公仔採用了Google最新的多模態大語言模型技術，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上， GeminiAI公仔 結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，Gemini AI公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'Gemini AI公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'Gemini AI公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google最新的多模態AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與Google生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'Gemini AI公仔的未來發展',
          desc1: '隨著Google AI技術的不斷進步，Gemini AI公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與Google其他AI服務的深度整合，如Google Cloud AI、Google Workspace等，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，Gemini AI公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，Gemini AI公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    geminiFigurine: {
      title: 'Gemini公仔 - 創新AI技術',
      subtitle: 'Gemini公仔採用Google最先進的AI技術，能夠將您的創意想法轉化為精美的3D公仔模型。我們的AI系統具備強大的理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗Gemini公仔生成',
      keywords: {
        geminiModel: 'Gemini模型',
        googleTech: 'Google技術',
        advancedAI: '先進AI',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新AI生成',
          desc: '基於Gemini模型的創新生成，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級AI技術',
          desc: '運用Google先進AI技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業AI應用',
          desc: '專業級Gemini AI應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是 Gemini公仔 ？',
          desc1: ' Gemini公仔 是基於Google Gemini AI技術開發的先進公仔生成系統。該系統能夠理解文字、圖片等多種輸入方式，並生成高質量的3D公仔模型。Gemini AI具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的AI生成系統不同， Gemini公仔 採用了最新的多模態學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: ' emini公仔 還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: 'Gemini公仔的核心特性',
          advancedModel: {
            title: '先進模型',
            desc: '採用Google最新的Gemini AI模型，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'Gemini公仔的技術架構',
          desc1: 'Gemini公仔採用了Google最新的多模態大語言模型技術，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上，Gemini公仔結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，Gemini公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'Gemini公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'Gemini公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google最新的Gemini AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與Google生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'Gemini公仔的未來發展',
          desc1: '隨著Google AI技術的不斷進步，Gemini公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與Google其他AI服務的深度整合，如Google Cloud AI、Google Workspace等，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，Gemini公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，Gemini公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    googleFigurine: {
      title: ' Google公仔 - 智能AI技術',
      subtitle: ' Google公仔 採用Google最先進的AI技術，能夠將您的創意想法轉化為精美的3D公仔模型。我們的AI系統具備強大的理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 Google公仔 生成',
      keywords: {
        googleAI: 'Google AI',
        googleTech: 'Google技術',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新AI生成',
          desc: '基於Google AI的創新生成，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級AI技術',
          desc: '運用Google先進AI技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業AI應用',
          desc: '專業級Google AI應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是 Google公仔 ？',
          desc1: 'Google公仔是基於Google AI技術開發的先進公仔生成系統。該系統能夠理解文字、圖片等多種輸入方式，並生成高質量的3D公仔模型。Google AI具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的AI生成系統不同，Google公仔採用了最新的多模態學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: 'Google公仔還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: 'Google公仔的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google最新的AI技術，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'Google公仔的技術架構',
          desc1: 'Google公仔採用了Google最新的多模態大語言模型技術，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上，Google公仔結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，Google公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'Google公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'Google公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google最新的AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與Google生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'Google公仔的未來發展',
          desc1: '隨著Google AI技術的不斷進步，Google公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與Google其他AI服務的深度整合，如Google Cloud AI、Google Workspace等，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，Google公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，Google公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    googleAIFigurine: {
      title: ' GoogleAI公仔 - 革命性AI技術',
      subtitle: ' GoogleAI公仔 採用Google最先進的多模態AI技術，能夠將您的創意想法轉化為精美的3D公仔模型。我們的AI系統具備強大的理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 GoogleAI公仔 生成',
      keywords: {
        googleAI: 'Google AI',
        googleTech: 'Google技術',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新AI生成',
          desc: '基於Google AI的創新生成，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級AI技術',
          desc: '運用Google先進AI技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業AI應用',
          desc: '專業級Google AI應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: { 
          title: '什麼是 GoogleAI公仔 ？',
          desc1: 'Google AI公仔是基於Google多模態AI技術開發的先進公仔生成系統。該系統能夠理解文字、圖片、語音等多種輸入方式，並生成高質量的3D公仔模型。Google AI具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的AI生成系統不同，Google AI公仔採用了最新的多模態學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: 'Google AI公仔還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: 'Google AI公仔的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google最新的多模態AI技術，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'Google AI公仔的技術架構',
          desc1: 'Google AI公仔採用了Google最新的多模態大語言模型技術，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上，Google AI公仔結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，Google AI公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'Google AI公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'Google AI公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google最新的AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與Google生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'Google AI公仔的未來發展',
          desc1: '隨著Google AI技術的不斷進步，Google AI公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與Google其他AI服務的深度整合，如Google Cloud AI、Google Workspace等，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，Google AI公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，Google AI公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    googleAIStudioFigurine: {
      title: 'Google AI Studio公仔 - 專業AI創作平台',
      subtitle: 'Google AI Studio公仔基Google AI Studi平台，為專業創作者提供強大的AI公仔生成工具。結合Google最先進的AI技術，讓您的創意想法快速轉化為精美的3D公仔模型。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 Google AI Studio公仔 生成',
      keywords: {
        googleAIStudio: 'Google AI Studio',
        googleTech: 'Google技術',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新Studio生成',
          desc: '基於Google AI Studio的創新生成，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級Studio技術',
          desc: '運用Google AI Studio先進技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業Studio應用',
          desc: '專業級Google AI Studio應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是 Google AI Studio公仔 ？',
          desc1: ' Google AI Studio公仔 是基於Google AI Studio平台開發的先進公仔生成系統。該系統充分利用Google AI Studio的強大功能，能夠理解文字、圖片等多種輸入方式，並生成高質量的3D公仔模型。Google AI Studio具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的AI生成系統不同， Google AI Studio公仔 採用了最新的多模態學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: 'Google AI Studio公仔還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: 'Google AI Studio公仔的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google AI Studio最新的AI技術，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'Google AI Studio公仔的技術架構',
          desc1: 'Google AI Studio公仔採用了Google AI Studio平台的最新技术，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上，Google AI Studio公仔結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，Google AI Studio公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'Google AI Studio公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'Google AI Studio公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用Google AI Studio最新的AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與Google AI Studio生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'Google AI Studio公仔的未來發展',
          desc1: '隨著Google AI Studio技術的不斷進步，Google AI Studio公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與Google AI Studio其他功能的深度整合，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，Google AI Studio公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，Google AI Studio公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    ai3DFigurine: {
      title: ' AI 3D公仔 - 立體AI創作技術',
      subtitle: ' AI 3D公仔 採用最先進的3D建模AI技術，能夠將您的創意想法轉化為精美的立體公仔模型。我們的AI系統具備強大的三維理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 AI 3D公仔 生成',
      keywords: {
        ai3D: 'AI 3D',
        threeDimensional: '三維立體',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新3D生成',
          desc: '基於AI 3D技術的創新生成，實現獨特的立體公仔設計'
        },
        advanced: {
          title: '高級3D技術',
          desc: '運用AI 3D先進技術，生成高質量立體公仔模型'
        },
        professional: {
          title: '專業3D應用',
          desc: '專業級AI 3D應用，實現精準的立體公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是 AI 3D公仔 ？',
          desc1: 'AI 3D公仔是基於先進3D建模AI技術開發的立體公仔生成系統。該系統能夠理解文字、圖片等多種輸入方式，並生成高質量的3D立體公仔模型。AI 3D技術具備強大的三維空間理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的2D AI生成系統不同，AI 3D公仔採用了最新的三維深度學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D立體模型特徵。',
          desc3: 'AI 3D公仔還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的立體創作成果。'
        },
        coreFeatures: {
          title: 'AI 3D公仔的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的3D建模AI技術，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創立體設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'AI 3D公仔的技術架構',
          desc1: 'AI 3D公仔採用了最新的3D建模AI技術，具備強大的三維理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的三維空間關係和幾何結構。',
          desc2: '在技術實現上，AI 3D公仔結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，AI 3D公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'AI 3D公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'AI 3D公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的3D建模AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與3D建模生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'AI 3D公仔的未來發展',
          desc1: '隨著3D建模AI技術的不斷進步，AI 3D公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的三維理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與3D建模其他技術的深度整合，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，AI 3D公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，AI 3D公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    makeFigurineAI: {
      title: ' 製作公仔AI - 智能創作技術',
      subtitle: ' 製作公仔AI 採用最先進的人工智能技術，能夠將您的創意想法轉化為精美的3D公仔模型。我們的AI系統具備強大的理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 製作公仔AI 生成',
      keywords: {
        makeFigurine: '製作公仔',
        aiTechnology: 'AI技術',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新AI製作',
          desc: '基於AI的創新製作技術，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級製作技術',
          desc: '運用AI先進技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業製作應用',
          desc: '專業級AI製作應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是製作公仔AI？',
          desc1: '製作公仔AI是基於先進人工智能技術開發的公仔製作系統。該系統能夠理解文字、圖片等多種輸入方式，並生成高質量的3D公仔模型。AI技術具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的製作系統不同，製作公仔AI採用了最新的深度學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: '製作公仔AI還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: '製作公仔AI的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的AI技術，確保製作質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: '製作公仔AI的技術架構',
          desc1: '製作公仔AI採用了最新的深度學習技術，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上，製作公仔AI結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，製作公仔AI還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: '製作公仔AI的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: '製作公仔AI的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的AI技術，確保製作質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與創作生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: '製作公仔AI的未來發展',
          desc1: '隨著AI技術的不斷進步，製作公仔AI將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與其他AI服務的深度整合，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，製作公仔AI代表了AI公仔製作技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，製作公仔AI將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    ai3DFigurine2: {
      title: ' AI 3D公仔 - 立體創作技術',
      subtitle: ' AI 3D公仔 採用最先進的3D建模AI技術，能夠將您的創意想法轉化為精美的立體公仔模型。我們的AI系統具備強大的三維理解和生成能力，為創意設計帶來無限可能。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 AI 3D公仔 生成',
      keywords: {
        ai3D: 'AI 3D',
        threeDimensional: '三維立體',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新3D生成',
          desc: '基於AI 3D技術的創新生成，實現獨特的立體公仔設計'
        },
        advanced: {
          title: '高級3D技術',
          desc: '運用AI 3D先進技術，生成高質量立體公仔模型'
        },
        professional: {
          title: '專業3D應用',
          desc: '專業級AI 3D應用，實現精準的立體公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是 AI 3D公仔 ？',
          desc1: 'AI 3D公仔是基於先進3D建模AI技術開發的立體公仔生成系統。該系統能夠理解文字、圖片等多種輸入方式，並生成高質量的3D立體公仔模型。AI 3D技術具備強大的三維空間理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的2D AI生成系統不同，AI 3D公仔採用了最新的三維深度學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D立體模型特徵。',
          desc3: 'AI 3D公仔還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的立體創作成果。'
        },
        coreFeatures: {
          title: 'AI 3D公仔的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的3D建模AI技術，確保生成質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創立體設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'AI 3D公仔的技術架構',
          desc1: 'AI 3D公仔採用了最新的3D建模AI技術，具備強大的三維理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的三維空間關係和幾何結構。',
          desc2: '在技術實現上，AI 3D公仔結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，AI 3D公仔還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'AI 3D公仔的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'AI 3D公仔的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的3D建模AI技術，確保生成質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與3D建模生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'AI 3D公仔的未來發展',
          desc1: '隨著3D建模AI技術的不斷進步，AI 3D公仔將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的三維理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與3D建模其他技術的深度整合，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，AI 3D公仔代表了AI公仔生成技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，AI 3D公仔將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    aiFigurineMake: {
      title: ' AI公仔製作  - 智能創作流程',
      subtitle: ' AI公仔製作 採用最先進的人工智能技術，為創作者提供完整的公仔製作解決方案。從創意構思到最終成品，AI技術貫穿整個製作流程，讓創作變得更加簡單高效。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '體驗 AI公仔製作 流程',
      keywords: {
        aiFigurine: 'AI公仔',
        makeProcess: '製作流程',
        advancedModel: '先進模型',
        creativeDesign: '創意設計',
        smartGeneration: '智能生成',
        innovativeTech: '創新技術'
      },
      examples: {
        innovative: {
          title: '創新製作流程',
          desc: '基於AI的創新製作流程，實現獨特的公仔設計'
        },
        advanced: {
          title: '高級製作技術',
          desc: '運用AI先進技術，生成高質量3D公仔模型'
        },
        professional: {
          title: '專業製作應用',
          desc: '專業級AI製作應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是AI公仔製作？',
          desc1: 'AI公仔製作是基於先進人工智能技術開發的完整公仔製作系統。該系統能夠理解文字、圖片等多種輸入方式，並生成高質量的3D公仔模型。AI技術具備強大的語義理解能力和創造性思維，能夠準確捕捉用戶的創作意圖。',
          desc2: '與傳統的製作系統不同，AI公仔製作採用了最新的深度學習技術，能夠同時處理多種類型的輸入信息。無論是文字描述、參考圖片，還是語音指令，系統都能準確理解並轉化為相應的3D模型特徵。',
          desc3: 'AI公仔製作還具備強大的適應性和學習能力。它能夠根據用戶的使用習慣和偏好不斷優化生成策略，為用戶提供更加個性化和精準的創作體驗。這種智能化的特性使得每個用戶都能獲得獨一無二的創作成果。'
        },
        coreFeatures: {
          title: 'AI公仔製作的核心特性',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的AI技術，確保製作質量'
          },
          creativeGeneration: {
            title: '創意生成',
            desc: '具備強大的創造性思維，能夠生成獨特的原創設計'
          },
          multiModal: {
            title: '多模態處理',
            desc: '支持文字、圖片、語音等多種輸入方式'
          },
          smartOptimization: {
            title: '智能優化',
            desc: '自動優化生成參數，確保最佳輸出效果'
          }
        },
        technology: {
          title: 'AI公仔製作的技術架構',
          desc1: 'AI公仔製作採用了最新的深度學習技術，具備強大的理解和生成能力。該系統基於Transformer架構，通過大規模預訓練和微調，能夠準確理解複雜的語義關係和空間結構。',
          desc2: '在技術實現上，AI公仔製作結合了計算機視覺、自然語言處理和3D建模等多個領域的先進技術。系統能夠將2D圖像信息轉化為3D幾何結構，同時保持細節的完整性和準確性。',
          desc3: '此外，AI公仔製作還採用了強化學習和對抗訓練技術，通過不斷的自我優化和反饋學習，持續提升生成質量。這種技術架構使得系統能夠適應各種複雜的創作需求，為用戶提供穩定可靠的創作工具。'
        },
        applications: {
          title: 'AI公仔製作的應用領域',
          creative: {
            title: '創意設計',
            items: [
              '動漫角色設計',
              '遊戲人物創作',
              '藝術雕塑製作',
              '個性化定制'
            ]
          },
          commercial: {
            title: '商業應用',
            items: [
              '手辦原型製作',
              '影視特效製作',
              '產品設計輔助',
              '營銷物料生成'
            ]
          }
        },
        advantages: {
          title: 'AI公仔製作的技術優勢',
          advancedAI: {
            title: '先進AI技術',
            desc: '採用最新的AI技術，確保製作質量'
          },
          creativeFlexibility: {
            title: '創意靈活性',
            desc: '支持多種創作風格和設計方向，滿足不同需求'
          },
          qualityOutput: {
            title: '高質量輸出',
            desc: '生成模型具有極高的幾何精度和細節表現'
          },
          integration: {
            title: '無縫集成',
            desc: '與創作生態系統深度集成，提供流暢的使用體驗'
          }
        },
        future: {
          title: 'AI公仔製作的未來發展',
          desc1: '隨著AI技術的不斷進步，AI公仔製作將繼續進化和升級。我們計劃在未來版本中集成更多的AI能力，包括更強大的多模態理解、更精準的3D建模、更智能的創意生成等。',
          desc2: '同時，我們也將探索與其他AI服務的深度整合，為用戶提供更加完整和便捷的創作生態系統。這將為創意設計帶來全新的工作流程和體驗模式。',
          desc3: '總的來說，AI公仔製作代表了AI公仔製作技術的前沿水平，它不僅為當前的創意設計提供了強大的工具支持，也為未來的技術發展指明了方向。我們相信，隨著技術的不斷進步，AI公仔製作將為更多用戶帶來無限可能的創作體驗。'
        }
      }
    },
    figurineAICommand: {
      title: '公仔AI指令 - 精準控制AI創作',
      subtitle: '掌握公仔AI指令，讓您能夠精準控制AI生成過程，創造出更符合您期望的3D公仔模型。通過專業的指令技巧，實現從簡單描述到複雜設計的完美轉換。',
      cta: '立即上傳圖片製作AI公仔',
      ctaEnd: '立即使用AI指令製作公仔',
      keywords: {
        aiCommand: 'AI指令控制',
        generationCommand: '公仔生成指令',
        smartSystem: '智能指令系統',
        parameterAdjust: 'AI參數調節',
        designCommand: '公仔設計指令',
        creationControl: 'AI創作控制',
        modelingCommand: '智能建模指令',
        customCommand: '公仔定制指令'
      },
      examples: {
        basic: {
          title: '基礎指令控制',
          desc: '掌握基礎AI指令，實現基本的公仔生成控制'
        },
        advanced: {
          title: '高級指令技巧',
          desc: '運用高級指令技巧，實現複雜的公仔設計需求'
        },
        professional: {
          title: '專業指令應用',
          desc: '專業級AI指令應用，實現精準的公仔創作控制'
        }
      },
      sections: {
        whatIs: {
          title: '什麼是公仔AI指令？',
          desc1: '公仔AI指令是一種專門用於控制AI生成3D公仔模型的指令系統。它通過特定的語法和關鍵詞，讓用戶能夠精確地指導AI系統生成符合要求的公仔設計。這些指令涵蓋了公仔的外觀特徵、風格類型、材質質感、動作姿態等各個方面，為用戶提供了強大的創作控制能力。通過AI指令控制、公仔生成指令和智能指令系統，用戶可以精確控制AI創作過程。',
          desc2: 'AI指令系統基於自然語言處理技術，能夠理解用戶的指令意圖並轉化為具體的生成參數。通過學習和掌握這些指令，用戶可以從簡單的文字描述中生成複雜的3D公仔模型，實現從創意到成品的快速轉換。這種AI參數調節、公仔設計指令和AI創作控制技術為智能建模指令和公仔定制指令提供了強大的支持。',
          desc3: '公仔AI指令的優勢在於其靈活性和精確性。用戶可以根據自己的需求調整指令內容，實現個性化的創作效果。同時，指令系統還支持組合使用，通過多個指令的組合，可以創造出更加複雜和獨特的公仔設計。通過智能指令系統、AI創作控制和公仔生成指令，用戶可以輕鬆實現從簡單描述到複雜設計的完美轉換。'
        },
        coreFeatures: {
          title: '公仔AI指令的核心功能',
          preciseControl: {
            title: '精確控制',
            desc: '通過指令精確控制公仔的每個細節特徵'
          },
          flexibleCombination: {
            title: '靈活組合',
            desc: '支持多個指令的組合使用，實現複雜設計'
          },
          smartUnderstanding: {
            title: '智能理解',
            desc: 'AI系統能夠準確理解指令的語義和意圖'
          },
          fastResponse: {
            title: '快速響應',
            desc: '指令執行速度快，實時生成結果'
          }
        },
        commandTypes: {
          title: '常用公仔AI指令類型',
          appearance: {
            title: '外觀特徵指令',
            desc: '控制公仔的外貌特徵，如髮型、眼睛、鼻子、嘴巴等具體細節',
            example: '"長直發，大眼睛，小巧鼻子，微笑表情"'
          },
          style: {
            title: '風格類型指令',
            desc: '指定公仔的藝術風格，如動漫、寫實、卡通、科幻等',
            example: '"動漫風格，Q版造型，日系畫風"'
          },
          material: {
            title: '材質質感指令',
            desc: '控制 公仔 的表面材質和質感效果',
            example: '"陶瓷質感，光滑表面，金屬光澤"'
          },
          pose: {
            title: '動作姿態指令',
            desc: '指定 公仔 的動作和姿態，增加動態感',
            example: '"站立姿勢，右手舉起，左腳前伸"'
          }
        },
        advancedTechniques: {
          title: '高級AI指令技巧',
          weightControl: {
            title: '權重控制',
            desc: '使用權重符號（如::2）來強調某些特徵的重要性',
            example: '"大眼睛::2，長頭髮::1.5，可愛表情"'
          },
          negativeCommand: {
            title: '否定指令',
            desc: '使用否定詞來排除不需要的特徵',
            example: '"可愛女孩，不要眼鏡，不要帽子"'
          },
          combinationCommand: {
            title: '組合指令',
            desc: '將多個指令組合使用，實現複雜的設計需求',
            example: '"動漫風格 + 科幻元素 + 未來感服裝"'
          },
          referenceCommand: {
            title: '參考指令',
            desc: '使用參考圖片或風格來指導生成過程',
            example: '"參考某動漫角色風格，但改為現代服裝"'
          }
        },
        optimizationStrategies: {
          title: 'AI指令優化策略',
          writingTips: {
            title: '指令編寫技巧',
            items: [
              '使用具體、明確的描述詞彙',
              '按照重要性排序特徵描述',
              '避免模糊或矛盾的描述',
              '使用專業術語提升準確性'
            ]
          },
          debuggingMethods: {
            title: '調試優化方法',
            items: [
              '逐步調整指令參數',
              '對比不同指令的效果',
              '記錄成功的指令組合',
              '學習他人的優秀指令'
            ]
          }
        },
        practicalExamples: {
          title: '實用AI指令示例',
          anime: {
            title: '動漫風格 公仔 ',
            example: '"動漫風格，Q版造型，大眼睛，長直發，可愛表情，粉色頭髮，白色連衣裙，站立姿勢，日系畫風，高光效果"'
          },
          scifi: {
            title: '科幻風格公仔',
            example: '"科幻風格，未來感設計，金屬質感，發光效果，機械元素，藍色配色，酷炫表情，戰鬥姿態，高科技服裝"'
          },
          realistic: {
            title: '寫實風格公仔',
            example: '"寫實風格，真實比例，細膩皮膚，自然表情，現代服裝，生活化姿態，高精度細節，柔和光影"'
          }
        },
        futureDevelopment: {
          title: 'AI指令的未來發展',
          desc1: '隨著人工智能技術的不斷發展， 公仔 AI指令系統也將變得更加智能和人性化。未來的AI指令將支持更自然的語言表達，用戶可以用更口語化的方式描述需求，AI系統能夠自動理解和優化指令內容。',
          desc2: '同時，AI指令系統還將支持多模態輸入，用戶可以通過語音、手勢、甚至思維來控制AI生成過程。這將大大降低使用門檻，讓更多人能夠輕鬆掌握AI創作技巧。',
          desc3: '此外，AI指令系統還將具備學習能力，能夠根據用戶的使用習慣和偏好自動優化指令建議，為用戶提供更加個性化的創作體驗。這將使得AI創作變得更加智能和高效，為創意產業帶來新的發展機遇。'
        }
      }
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'zh' | 'zh-tw'>('zh-tw'); // 默认中文繁体
  
  // 在客户端挂载后从localStorage读取语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nano-banana-language');
    if (savedLanguage === 'zh' || savedLanguage === 'en' || savedLanguage === 'zh-tw') {
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

  const handleSetLanguage = (lang: 'en' | 'zh' | 'zh-tw') => {
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

