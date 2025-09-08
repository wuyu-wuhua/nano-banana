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
      title: '将你的想法转化为惊艳的公仔',
      subtitle: '使用我们先进的AI 3D模型生成技术，在几秒钟内创作出美丽、独特的公仔模型',
      cta: '立即开始创作',
      learnMore: '了解更多',
      examplePrompt: '粉色头发的可爱动漫女孩公仔',
    },
    what: {
      title: '什么是Nano Banana？',
      subtitle: '一个AI驱动的平台，将你的文字描述转化为惊艳的3D公仔模型',
      feature1: {
        title: 'AI驱动生成',
        desc: '先进的人工智能在几秒钟内将你的文字描述转化为惊艳、独特的3D公仔模型',
      },
      feature2: {
        title: '多种公仔风格',
        desc: '选择动漫、写实、Q版、奇幻等数十种公仔风格',
      },
      feature3: {
        title: '高质量3D模型',
        desc: '生成详细的3D模型，完美适用于3D打印、游戏和收藏品',
      },
      feature4: {
        title: '极速生成',
        desc: '在30秒内获得你的定制公仔模型。无需等待，无延迟 - 即时创作',
      },
    },
    why: {
      title: '为什么选择Nano Banana？',
      subtitle: '体验3D公仔创作的未来',
      reason1: {
        title: '隐私与安全',
        desc: '你的提示词和生成的3D模型完全私密。我们绝不会在未经许可的情况下存储或分享你的创意内容',
        stats: '隐私优先'
      },
      reason2: {
        title: '创作者信赖',
        desc: '加入超过50万名艺术家、设计师和创作者，他们都依赖Nano Banana进行公仔项目',
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
        images: '已生成公仔',
        styles: '公仔风格',
      },
    },
    how: {
      title: '如何使用',
      subtitle: '创作公仔的三个简单步骤',
      step1: {
        title: '输入你的提示词',
        desc: '用简单的词汇描述你的公仔愿景。尽可能创意和详细',
      },
      step2: {
        title: '选择你的风格',
        desc: '选择各种公仔风格，如动漫、写实、Q版等',
      },
      step3: {
        title: '下载你的模型',
        desc: '获得令人惊艳的AI生成3D公仔模型，随时可用于3D打印',
      },
    },
    stats: {
      images: '已创建公仔',
      users: '活跃用户',
      uptime: '运行时间',
      support: '支持服务',
    },
    testimonials: {
      title: '用户评价',
      subtitle: '加入数千名满意的创作者，他们已经使用Nano Banana将想法转化为惊艳的公仔模型。以下是他们Nano Banana体验的评价',
      user1: {
        name: '陈莎拉',
        role: '3D艺术家',
        text: 'Nano Banana彻底改变了我的创意工作流程。AI生成3D公仔的质量绝对令人惊艳，可用的风格种类令人难以置信。我每天都在客户项目中使用它。',
      },
      user2: {
        name: '马库斯·罗德里格斯',
        role: '游戏开发者',
        text: '作为游戏开发者，我需要快速获得高质量3D模型。Nano Banana正是如此。速度和质量无与伦比，为我们团队节省了无数时间和预算。',
      },
      user3: {
        name: '艾米丽·沃森',
        role: '收藏家',
        text: '起初我对AI生成公仔持怀疑态度，但Nano Banana完全改变了我的想法。模型如此详细和创意 - 有时甚至比我想象的更好。就像拥有一个个人雕塑师。',
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
        imagesGenerated: '已生成公仔',
        satisfactionRate: '满意度',
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于Nano Banana你需要知道的一切',
      contact: '还有问题？我们随时为你提供帮助！',
      contactButton: '联系支持',
      q1: 'Nano Banana是如何工作的？',
      a1: 'Nano Banana使用先进的AI模型来解读你的文字描述并生成相应的3D公仔模型。只需输入你想要创建的内容，选择你喜欢的风格，我们的AI就会在几秒钟内创建独特的3D模型。',
      q2: '我可以生成什么类型的公仔？',
      a2: '你可以生成几乎任何类型的公仔 - 从动漫角色到写实人物、Q版风格、奇幻生物、动物等等。我们的AI支持150多种不同的公仔风格，可以处理复杂、详细的提示词。',
      q3: '我可以创建的公仔数量有限制吗？',
      a3: '免费用户每天最多可以生成10个公仔。高级订阅用户可以获得无限生成、优先处理和访问高级功能的权限，如更高细节级别和独家公仔风格。',
      q4: '生成的3D模型质量如何？',
      a4: '免费用户获得标准质量的模型。高级用户可以生成高细节模型，完美适用于3D打印、游戏和专业用途。',
      q5: '我可以商业使用生成的公仔吗？',
      a5: '是的！所有使用Nano Banana生成的公仔都可以用于商业目的。你拥有创作的完全权利，包括销售、修改和分发它们的权利。',
      q6: '生成公仔需要多长时间？',
      a6: '大多数公仔在15-30秒内生成。高级用户享受优先处理，在高峰时段可以将生成时间缩短到仅10秒。',
      q7: 'Nano Banana与其他AI生成器有什么不同？',
      a7: 'Nano Banana专注于3D公仔生成，注重质量、速度和用户体验。我们使用最新的AI模型，提供比竞争对手更多的公仔风格，提供更好的提示词理解，并保持行业最高的3D模型质量标准。',
      q8: '我的数据安全私密吗？',
      a8: '绝对安全。我们认真对待隐私。你的提示词和生成的3D模型都经过加密，绝不会与第三方共享。你可以随时删除你的账户和所有相关数据。',
    },
    footer: {
      description: '使用Nano Banana的尖端AI技术，将你的想象力转化为惊艳的3D公仔作品。通过简单的文字提示，创作、分享和发现令人惊叹的3D模型。',
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
      title: '公仔画廊',
      subtitle: '探索我们社区使用Nano Banana AI技术创作的惊艳公仔模型。获得灵感并创作你自己的杰作',
      loadMore: '加载更多作品',
      prompt: '提示词：',
      refresh: '刷新画廊',
      loginRequired: '请先登录以将公仔添加到您的画廊',
      alreadyInGallery: '此公仔已在您的画廊中',
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
        title: '用户AI生成公仔',
        desc: '使用Nano Banana AI技术创建的独特公仔模型',
        prompt: '您的创意提示',
        createdAt: '创建于'
      },
      image1: {
        title: '神秘精灵公仔',
        desc: '一个充满发光翅膀和空灵美丽的魔法精灵公仔',
      },
      image2: {
        title: '赛博朋克机器人公仔',
        desc: '一个拥有霓虹细节和金属质感的未来机器人公仔',
      },
      image3: {
        title: '海洋美人鱼公仔',
        desc: '一个充满活力海洋色彩的宁静美人鱼公仔',
      },
      image4: {
        title: '山龙公仔',
        desc: '拥有戏剧性翅膀和鳞片的雄伟龙公仔',
      },
      image5: {
        title: '太空探索者公仔',
        desc: '一个拥有星系主题细节的惊艳宇航员公仔',
      },
      image6: {
        title: '抽象艺术公仔',
        desc: '充满流动艺术设计的 vibrant 抽象公仔',
      },
      image7: {
        title: '野生动物公仔',
        desc: '一个拥有详细毛发和特征的雄伟动物公仔',
      },
      image8: {
        title: '建筑公仔',
        desc: '拥有独特几何图案的现代建筑公仔',
      },
      image9: {
        title: '复古汽车公仔',
        desc: '怀旧风格中的经典复古汽车公仔',
      },
      prompt1: '魔法精灵公仔，发光翅膀，空灵美丽，奇幻风格',
      prompt2: '赛博朋克机器人公仔，霓虹细节，金属质感，未来设计',
      prompt3: '美人鱼公仔，海洋色彩，宁静美丽，水生主题',
      prompt4: '龙公仔，雄伟翅膀，戏剧性鳞片，奇幻生物',
      prompt5: '宇航员公仔，星系细节，太空探索者，宇宙主题',
      prompt6: '抽象公仔，活力色彩，流动设计，艺术风格',
      prompt7: '动物公仔，详细毛发，真实特征，野生动物主题',
      prompt8: '建筑公仔，几何图案，现代建筑，城市设计',
      prompt9: '复古汽车公仔，经典设计，怀旧风格，复古主题',
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
      heroExamplePrompt: '粉色头发的可爱动漫女孩公仔',
      title: 'AI公仔生成器',
      subtitle: '使用我们先进的AI技术，将你的想法转化为惊艳的3D公仔模型',
      promptPlaceholder: '描述你想要创建的公仔...',
      styleLabel: '公仔风格',
      sizeLabel: '模型尺寸',
      generateButton: '生成公仔',
      generating: '生成中...',
      downloadButton: '下载',
      favoriteButton: '收藏',
      regenerateButton: '重新生成',
      successMessage: '公仔生成成功！',
      errorMessage: '生成失败，请重试',
      waitingForGeneration: '等待生成',
      success: '成功',
      describeYourIdea: '描述你的公仔创意',
      describeYourIdeaDesc: '详细描述你想要生成的公仔内容',
      result: '生成结果',
      enterPromptAndClick: '输入提示词并点击生成按钮',
      styleRealistic: '🎭 写实风格 - 逼真的公仔效果',
      styleAnime: '🎌 动漫风格 - 日式动漫公仔',
      styleOilPainting: '🖼️ Q版风格 - 可爱的Q版公仔',
      styleWatercolor: '💧 奇幻风格 - 奇幻生物公仔',
      styleSketch: '✏️ 简约风格 - 极简公仔设计',
      sizeSquare: '⬜ 小型',
      sizePortrait: '📱 中型',
      sizeLandscape: '🖥️ 大型',
      sizeWidescreen: '🎬 超大',
      sizeMobilePortrait: '📱 迷你',
      tip: '提示：描述越详细，生成的公仔越符合你的想象',
      costCredits: '消耗 {credits} 积分',
      loginRequired: '请先登录',
      loginRequiredDesc: '登录后才能使用AI公仔生成功能',
      cancel: '取消',
      goToLogin: '去登录',
      generatedImage: '生成的公仔',
      generationFailed: '生成失败',
      insufficientCredits: '积分不足，请先充值',
      creditConsumeError: '积分消耗失败，请重试',
      addedToGallery: '公仔已自动添加到您的画廊！',
      alreadyInGallery: '已存在于您的画廊中',
      addToGallery: '添加到画廊',
      removedFromGallery: '公仔已从您的画廊中移除',
      operationFailed: '操作失败，请重试',
      // 新增提示信息
      addToGalleryHint: '点击爱心按钮添加到画廊',
      removeFromGalleryHint: '点击爱心按钮从画廊中移除',
      imageSaved: '公仔已保存，点击爱心按钮展示到画廊',
      // 图片上传相关
      uploadImage: '上传参考图片',
      uploadImageDesc: '上传一张图片，基于此图片生成公仔',
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
      title: '革新AI公仔创作',
      subtitle: 'Nano Banana处于AI驱动3D创意的前沿，赋能艺术家、设计师和创作者，通过尖端人工智能技术将最狂野的想象力变为现实。',
      mission: {
        title: '我们的使命',
        desc: '通过让专业级AI 3D模型生成技术为每个人所用，实现公仔创作的民主化。我们相信创意应该没有界限，技术应该放大人类想象力，而不是取代它。',
      },
      vision: {
        title: '我们的愿景',
        desc: '一个任何人都能在几秒钟内创作惊艳3D公仔的世界，想法从脑海自由流向3D模型，AI成为人类表达和创新的终极创意伙伴。',
      },
      feature1: {
        title: '先进AI技术',
        desc: '由最先进的机器学习模型驱动，提供高质量、创意和独特的3D公仔生成。',
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
        images: '已创建公仔',
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
      subtitle: '基于积分的灵活定价，每次公仔生成仅需10积分',
      creditInfo: '每次AI公仔生成消耗 10 积分',
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
          '50 次AI公仔生成',
          '基础模型质量',
          '标准客服支持',
          '7天退款保证'
        ],
        advanced: [
          '1000 积分',
          '100 次AI公仔生成',
          '高清模型质量',
          '优先客服支持',
          '30天退款保证',
          '专属公仔风格'
        ],
        professional: [
          '3000 积分',
          '300 次AI公仔生成',
          '超高清模型质量',
          '24/7 专属客服',
          '90天退款保证',
          '专属公仔风格',
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
      startCreating: '开始AI公仔创作',
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
      aiGenerations: 'AI公仔生成次数',
      usedThisMonth: '本月已使用',
      collectedWorks: '收藏公仔',
      collectedWorksDesc: '已收藏公仔',
      membershipLevel: '会员等级',
      advancedUser: '高级用户',
      premiumUser: '高级用户',
      creditsOverview: '积分概览',
      availableCredits: '可用积分',
      creditsDescription: '用于AI公仔生成的积分',
      remainingGenerations: '剩余生成次数',
      creditsValue: '积分价值',
      buyMoreCredits: '购买更多积分',
      aiGenerationHistory: 'AI公仔生成记录',
      imageGeneration: '公仔生成',
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
      title: '一个设计，一套公仔',
      subtitle: '同一张人物图片可以生成一套完整的公仔系列，包含多种风格和姿态',
      originalTitle: '原始人物设计',
      originalDesc: '输入的人物参考图片',
      conclusion: {
        title: '🎨 一套公仔，多种可能',
        desc: '通过AI技术，您可以将任何人物图片转换为一套完整的公仔系列。无论是动漫、写实、奇幻还是机甲风格，都能生成配套的公仔收藏品，让您的创意想法变成现实的公仔系列。'
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
      title: '將你的想法轉化為驚豔的公仔',
      subtitle: '使用我們先進的AI 3D模型生成技術，在幾秒鐘內創作出美麗、獨特的公仔模型',
      cta: '立即開始創作',
      learnMore: '了解更多',
      examplePrompt: '粉色頭髮的可愛動漫女孩公仔',
    },
    what: {
      title: '什麼是Nano Banana？',
      subtitle: '一個AI驅動的平台，將你的文字描述轉化為驚豔的3D公仔模型',
      feature1: {
        title: 'AI驅動生成',
        desc: '先進的人工智慧在幾秒鐘內將你的文字描述轉化為驚豔、獨特的3D公仔模型',
      },
      feature2: {
        title: '多種公仔風格',
        desc: '選擇動漫、寫實、Q版、奇幻等數十種公仔風格',
      },
      feature3: {
        title: '高品質3D模型',
        desc: '生成詳細的3D模型，完美適用於3D列印、遊戲和收藏品',
      },
      feature4: {
        title: '極速生成',
        desc: '在30秒內獲得你的定制公仔模型。無需等待，無延遲 - 即時創作',
      },
    },
    why: {
      title: '為什麼選擇Nano Banana？',
      subtitle: '體驗3D公仔創作的未來',
      reason1: {
        title: '隱私與安全',
        desc: '你的提示詞和生成的3D模型完全私密。我們絕不會在未經許可的情況下儲存或分享你的創意內容',
        stats: '隱私優先'
      },
      reason2: {
        title: '創作者信賴',
        desc: '加入超過50萬名藝術家、設計師和創作者，他們都依賴Nano Banana進行公仔專案',
        stats: '創作者信賴'
      },
      reason3: {
        title: '業界領先',
        desc: '我們的AI模型採用最新技術訓練，相比其他平台提供卓越的3D模型品質',
        stats: '頂級品質'
      },
      reason4: {
        title: '持續改進',
        desc: '我們根據用戶回饋和技術進步定期更新AI模型並添加新功能',
        stats: '始終進化'
      },
      stats: {
        uptime: '運行時間保證',
        support: '客戶支援',
        images: '已生成公仔',
        styles: '公仔風格',
      },
    },
    how: {
      title: '如何使用',
      subtitle: '創作公仔的三個簡單步驟',
      step1: {
        title: '輸入你的提示詞',
        desc: '用簡單的詞彙描述你的公仔願景。盡可能創意和詳細',
      },
      step2: {
        title: '選擇你的風格',
        desc: '選擇各種公仔風格，如動漫、寫實、Q版等',
      },
      step3: {
        title: '下載你的模型',
        desc: '獲得令人驚豔的AI生成3D公仔模型，隨時可用於3D列印',
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
      title: '常見問題',
      subtitle: '關於Nano Banana你需要知道的一切',
      contact: '還有問題？我們隨時為你提供幫助！',
      contactButton: '聯繫支援',
      q1: 'Nano Banana是如何工作的？',
      a1: 'Nano Banana使用先進的AI模型來解讀你的文字描述並生成相應的3D公仔模型。只需輸入你想要創建的內容，選擇你喜歡的風格，我們的AI就會在幾秒鐘內創建獨特的3D模型。',
      q2: '我可以生成什麼類型的公仔？',
      a2: '你可以生成幾乎任何類型的公仔 - 從動漫角色到寫實人物、Q版風格、奇幻生物、動物等等。我們的AI支援150多種不同的公仔風格，可以處理複雜、詳細的提示詞。',
      q3: '我可以創建的公仔數量有限制嗎？',
      a3: '免費用戶每天最多可以生成10個公仔。高級訂閱用戶可以獲得無限生成、優先處理和訪問高級功能的權限，如更高細節級別和獨家公仔風格。',
      q4: '生成的3D模型品質如何？',
      a4: '免費用戶獲得標準品質的模型。高級用戶可以生成高細節模型，完美適用於3D列印、遊戲和專業用途。',
      q5: '我可以商業使用生成的公仔嗎？',
      a5: '是的！所有使用Nano Banana生成的公仔都可以用於商業目的。你擁有創作的完全權利，包括銷售、修改和分發它們的權利。',
      q6: '生成公仔需要多長時間？',
      a6: '大多數公仔在15-30秒內生成。高級用戶享受優先處理，在高峰時段可以將生成時間縮短到僅10秒。',
      q7: 'Nano Banana與其他AI生成器有什麼不同？',
      a7: 'Nano Banana專注於3D公仔生成，注重品質、速度和用戶體驗。我們使用最新的AI模型，提供比競爭對手更多的公仔風格，提供更好的提示詞理解，並保持業界最高的3D模型品質標準。',
      q8: '我的資料安全私密嗎？',
      a8: '絕對安全。我們認真對待隱私。你的提示詞和生成的3D模型都經過加密，絕不會與第三方共享。你可以隨時刪除你的帳戶和所有相關資料。',
    },
    footer: {
      description: '使用Nano Banana的尖端AI技術，將你的想像力轉化為驚豔的3D公仔作品。通過簡單的文字提示，創作、分享和發現令人驚歎的3D模型。',
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
      title: '公仔畫廊',
      subtitle: '探索我們社群使用Nano Banana AI技術創作的驚豔公仔模型。獲得靈感並創作你自己的傑作',
      loadMore: '載入更多作品',
      prompt: '提示詞：',
      refresh: '重新整理畫廊',
      loginRequired: '請先登入以將公仔添加到您的畫廊',
      alreadyInGallery: '此公仔已在您的畫廊中',
      addedToGallery: '成功添加到您的畫廊！',
      addFailed: '添加到畫廊失敗，請重試',
      removedFromGallery: '成功從您的畫廊中移除',
      deleteImage: '刪除圖片',
      zoomImage: '放大查看',
      removeFailed: '從畫廊移除失敗，請重試',
      operationFailed: '操作失敗，請重試',
      promptCopied: '提示詞已複製到剪貼簿！',
      copyFailed: '複製提示詞失敗，請重試',
      userGenerated: {
        badge: '用戶創作',
        title: '用戶AI生成公仔',
        desc: '使用Nano Banana AI技術創建的獨特公仔模型',
        prompt: '您的創意提示',
        createdAt: '創建於'
      },
      image1: {
        title: '神秘精靈公仔',
        desc: '一個充滿發光翅膀和空靈美麗的魔法精靈公仔',
      },
      image2: {
        title: '賽博朋克機器人公仔',
        desc: '一個擁有霓虹細節和金屬質感的未來機器人公仔',
      },
      image3: {
        title: '海洋美人魚公仔',
        desc: '一個充滿活力海洋色彩的寧靜美人魚公仔',
      },
      image4: {
        title: '山龍公仔',
        desc: '擁有戲劇性翅膀和鱗片的雄偉龍公仔',
      },
      image5: {
        title: '太空探索者公仔',
        desc: '一個擁有星系主題細節的驚豔宇航員公仔',
      },
      image6: {
        title: '抽象藝術公仔',
        desc: '充滿流動藝術設計的 vibrant 抽象公仔',
      },
      image7: {
        title: '野生動物公仔',
        desc: '一個擁有詳細毛髮和特徵的雄偉動物公仔',
      },
      image8: {
        title: '建築公仔',
        desc: '擁有獨特幾何圖案的現代建築公仔',
      },
      image9: {
        title: '復古汽車公仔',
        desc: '懷舊風格中的經典復古汽車公仔',
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
      prompt: '生成自提示詞：',
      heroExamplePrompt: '粉色頭髮的可愛動漫女孩公仔',
      title: 'AI公仔生成器',
      subtitle: '使用我們先進的AI技術，將你的想法轉化為驚豔的3D公仔模型',
      promptPlaceholder: '描述你想要創建的公仔...',
      styleLabel: '公仔風格',
      sizeLabel: '模型尺寸',
      generateButton: '生成公仔',
      generating: '生成中...',
      downloadButton: '下載',
      favoriteButton: '收藏',
      regenerateButton: '重新生成',
      successMessage: '公仔生成成功！',
      errorMessage: '生成失敗，請重試',
      waitingForGeneration: '等待生成',
      success: '成功',
      describeYourIdea: '描述你的公仔創意',
      describeYourIdeaDesc: '詳細描述你想要生成的公仔內容',
      result: '生成結果',
      enterPromptAndClick: '輸入提示詞並點擊生成按鈕',
      styleRealistic: '🎭 寫實風格 - 逼真的公仔效果',
      styleAnime: '🎌 動漫風格 - 日式動漫公仔',
      styleOilPainting: '🖼️ Q版風格 - 可愛的Q版公仔',
      styleWatercolor: '💧 奇幻風格 - 奇幻生物公仔',
      styleSketch: '✏️ 簡約風格 - 極簡公仔設計',
      sizeSquare: '⬜ 小型',
      sizePortrait: '📱 中型',
      sizeLandscape: '🖥️ 大型',
      sizeWidescreen: '🎬 超大',
      sizeMobilePortrait: '📱 迷你',
      tip: '提示：描述越詳細，生成的公仔越符合你的想像',
      costCredits: '消耗 {credits} 積分',
      loginRequired: '請先登入',
      loginRequiredDesc: '登入後才能使用AI公仔生成功能',
      cancel: '取消',
      goToLogin: '去登入',
      generatedImage: '生成的公仔',
      generationFailed: '生成失敗',
      insufficientCredits: '積分不足，請先充值',
      creditConsumeError: '積分消耗失敗，請重試',
      addedToGallery: '公仔已自動添加到您的畫廊！',
      alreadyInGallery: '已存在於您的畫廊中',
      addToGallery: '添加到畫廊',
      removedFromGallery: '公仔已從您的畫廊中移除',
      operationFailed: '操作失敗，請重試',
      // 新增提示資訊
      addToGalleryHint: '點擊愛心按鈕添加到畫廊',
      removeFromGalleryHint: '點擊愛心按鈕從畫廊中移除',
      imageSaved: '公仔已儲存，點擊愛心按鈕展示到畫廊',
      // 圖片上傳相關
      uploadImage: '上傳參考圖片',
      uploadImageDesc: '上傳一張圖片，基於此圖片生成公仔',
      clickToUpload: '點擊上傳圖片',
      supportedFormats: '支援 JPG、PNG、WebP 格式（最大10MB）',
      optionalPrompt: '可選描述',
      imageRequired: '請上傳一張圖片',
      invalidFileType: '請上傳有效的圖片檔案',
      fileTooLarge: '檔案過大（最大10MB）',
      uploadTip: '上傳清晰的參考圖片以獲得最佳效果',
    },
    about: {
      badge: '關於Nano Banana',
      title: '革新AI公仔創作',
      subtitle: 'Nano Banana處於AI驅動3D創意的前沿，賦能藝術家、設計師和創作者，通過尖端人工智慧技術將最狂野的想像力變為現實。',
      mission: {
        title: '我們的使命',
        desc: '通過讓專業級AI 3D模型生成技術為每個人所用，實現公仔創作的民主化。我們相信創意應該沒有界限，技術應該放大人類想像力，而不是取代它。',
      },
      vision: {
        title: '我們的願景',
        desc: '一個任何人都能在幾秒鐘內創作驚豔3D公仔的世界，想法從腦海自由流向3D模型，AI成為人類表達和創新的終極創意夥伴。',
      },
      feature1: {
        title: '先進AI技術',
        desc: '由最先進的機器學習模型驅動，提供高品質、創意和獨特的3D公仔生成。',
      },
      feature2: {
        title: '以用戶為中心的設計',
        desc: '為所有技能水平的創作者設計的直觀介面，從初學者到專業3D藝術家和設計師。',
      },
      feature3: {
        title: '隱私與安全',
        desc: '企業級安全措施，保護您的創意作品，確保您的智慧財產權安全。',
      },
      stats: {
        images: '已創建公仔',
        users: '活躍用戶',
        uptime: '運行時間',
        support: '支援服務',
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
      title: '選擇您的套餐',
      subtitle: '基於積分的靈活定價，每次公仔生成僅需10積分',
      creditInfo: '每次AI公仔生成消耗 10 積分',
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
          '基礎模型品質',
          '標準客服支援',
          '7天退款保證'
        ],
        advanced: [
          '1000 積分',
          '100 次AI公仔生成',
          '高清模型品質',
          '優先客服支援',
          '30天退款保證',
          '專屬公仔風格'
        ],
        professional: [
          '3000 積分',
          '300 次AI公仔生成',
          '超高清模型品質',
          '24/7 專屬客服',
          '90天退款保證',
          '專屬公仔風格',
          '批量生成功能',
          'API 訪問權限'
        ]
      },
      popular: '最受歡迎',
      buyNow: '立即購買',
      whyChoose: '為什麼選擇我們的積分系統？',
      benefits: {
        flexible: {
          title: '靈活使用',
          desc: '積分永久有效，隨時使用，不設時間限制'
        },
        transparent: {
          title: '透明定價',
          desc: '每次生成固定10積分，價格清晰明了'
        },
        value: {
          title: '高性價比',
          desc: '相比按次付費，積分套餐更經濟實惠'
        }
      },
      contact: '還有疑問？聯繫我們獲取更多資訊',
      startCreating: '開始AI公仔創作',
      contactSupport: '聯繫客服',
      loginRequired: '請登入繼續',
      loginRequiredMessage: '您未登入，請先登入後再進行支付',
    },
    profile: {
      title: '個人資料',
      subtitle: '管理您的帳戶資訊和查看使用統計',
      pleaseLogin: '請先登入',
      goToLogin: '去登入',
      loginRequired: '需要登入',
      loginToView: '請登入以查看您的個人資料',
      username: '用戶名',
      userEmail: '用戶信箱',
      userPoints: '用戶積分',
      freeAttempts: '免費嘗試次數',
      verifiedUser: '已驗證用戶',
      accountSettings: '帳戶設定',
      startAICreation: '開始AI創作',
      startGenerating: '開始生成',
      viewGallery: '查看畫廊',
      buyCredits: '購買積分',
      memberSince: '註冊時間',
      aiGenerations: 'AI公仔生成次數',
      usedThisMonth: '本月已使用',
      collectedWorks: '收藏公仔',
      collectedWorksDesc: '已收藏公仔',
      membershipLevel: '會員等級',
      advancedUser: '高級用戶',
      premiumUser: '高級用戶',
      creditsOverview: '積分概覽',
      availableCredits: '可用積分',
      creditsDescription: '用於AI公仔生成的積分',
      remainingGenerations: '剩餘生成次數',
      creditsValue: '積分價值',
      buyMoreCredits: '購買更多積分',
      aiGenerationHistory: 'AI公仔生成記錄',
      imageGeneration: '公仔生成',
      credits: '積分',
      noGenerationsYet: '還沒有生成記錄',
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
      title: '一個設計，一套公仔',
      subtitle: '同一張人物圖片可以生成一套完整的公仔系列，包含多種風格和姿態',
      originalTitle: '原始人物設計',
      originalDesc: '輸入的人物參考圖片',
      conclusion: {
        title: '🎨 一套公仔，多種可能',
        desc: '通過AI技術，您可以將任何人物圖片轉換為一套完整的公仔系列。無論是動漫、寫實、奇幻還是機甲風格，都能生成配套的公仔收藏品，讓您的創意想法變成現實的公仔系列。'
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

