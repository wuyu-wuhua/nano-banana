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
      getStarted: 'Get Started',
      aiGenerator: 'AI Generator'
    },
    hero: {
      title: 'Transform Your Ideas Into Stunning Art',
      subtitle: 'Create beautiful, unique artwork in seconds with our advanced AI image generation technology',
      cta: 'Start Creating Now',
      learnMore: 'Learn More',
      examplePrompt: 'Scene of several ducks swimming in the water',
    },
    what: {
      title: 'What is Nano Banana?',
      subtitle: 'An AI-powered platform that transforms your text descriptions into stunning visual artwork',
      feature1: {
        title: 'AI-Powered Generation',
        desc: 'Advanced artificial intelligence transforms your text descriptions into stunning, unique artwork in seconds',
      },
      feature2: {
        title: 'Multiple Art Styles',
        desc: 'Choose from photorealistic, cartoon, oil painting, watercolor, and dozens of other artistic styles',
      },
      feature3: {
        title: 'High-Quality Output',
        desc: 'Generate images in high resolution up to 4K quality, perfect for printing and professional use',
      },
      feature4: {
        title: 'Lightning Fast',
        desc: 'Get your custom artwork in under 30 seconds. No waiting, no delays - just instant creativity',
      },
    },
    why: {
      title: 'Why Choose Nano Banana?',
      subtitle: 'Experience the future of digital art creation',
      reason1: {
        title: 'Privacy & Security',
        desc: 'Your prompts and generated images are completely private. We never store or share your creative content without permission',
      },
      reason2: {
        title: 'Trusted by Creators',
        desc: 'Join over 500,000 artists, designers, and creators who rely on Nano Banana for their creative projects',
      },
      reason3: {
        title: 'Industry Leading',
        desc: 'Our AI models are trained on the latest technology, delivering superior quality compared to other platforms',
      },
      reason4: {
        title: 'Constantly Improving',
        desc: 'We regularly update our AI models and add new features based on user feedback and technological advances',
      },
      stats: {
        uptime: 'Uptime Guarantee',
        support: 'Customer Support',
        images: 'Images Generated',
        styles: 'Art Styles',
      },
    },
    how: {
      title: 'How It Works',
      subtitle: 'Three simple steps to create your masterpiece',
      step1: {
        title: 'Enter your prompt',
        desc: 'Describe your vision in simple words. Be as creative and detailed as you want',
      },
      step2: {
        title: 'Choose your style',
        desc: 'Select from various artistic styles like photorealistic, cartoon, oil painting, and more',
      },
      step3: {
        title: 'Download your art',
        desc: 'Get your stunning AI-generated artwork in high resolution, ready to use anywhere',
      },
    },
    stats: {
      images: 'Images Created',
      users: 'Active Users',
      uptime: 'Uptime',
      support: 'Support',
    },
    testimonials: {
      title: 'What Our Users Say',
      subtitle: 'Join thousands of satisfied creators who have transformed their ideas into stunning artwork with Nano Banana. Here\'s what they have to say about their Nano Banana experience',
      user1: {
        name: 'Sarah Chen',
        role: 'Digital Artist',
        text: 'Nano Banana has revolutionized my creative workflow. The quality of AI-generated images is absolutely stunning, and the variety of styles available is incredible. I use it daily for my client projects.',
      },
      user2: {
        name: 'Marcus Rodriguez',
        role: 'Marketing Director',
        text: 'As a marketing professional, I need high-quality visuals quickly. Nano Banana delivers exactly that. The speed and quality are unmatched, and it has saved our team countless hours and budget.',
      },
      user3: {
        name: 'Emily Watson',
        role: 'Content Creator',
        text: 'I was skeptical about AI art at first, but Nano Banana completely changed my mind. The images are so detailed and creative - sometimes even better than what I had imagined. It\'s like having a personal artist.',
      },
      user4: {
        name: 'David Kim',
        role: 'Game Developer',
        text: 'For concept art and game assets, Nano Banana is a game-changer. The variety of styles and the ability to iterate quickly has accelerated our development process significantly. Highly recommended!',
      },
      user5: {
        name: 'Lisa Thompson',
        role: 'Small Business Owner',
        text: 'Running a small business, I needed affordable yet professional visuals for my marketing. Nano Banana provides exactly that. The quality rivals expensive stock photos, but with complete customization.',
      },
      user6: {
        name: 'Alex Johnson',
        role: 'Freelance Designer',
        text: 'The creative possibilities with Nano Banana are endless. I can explore ideas and concepts that would take hours to create manually. It\'s become an essential tool in my design arsenal.',
      },
      stats: {
        averageRating: 'Average Rating',
        happyUsers: 'Happy Users',
        imagesGenerated: 'Images Generated',
        satisfactionRate: 'Satisfaction Rate',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about Nano Banana',
      contact: 'Still have questions? We\'re here to help!',
      contactButton: 'Contact Support',
      q1: 'How does Nano Banana work?',
      a1: 'Nano Banana uses advanced AI models to interpret your text descriptions and generate corresponding images. Simply type what you want to see, select your preferred style, and our AI will create a unique artwork in seconds.',
      q2: 'What kind of images can I generate?',
      a2: 'You can generate virtually any type of image - from realistic photographs to abstract art, cartoons, landscapes, portraits, fantasy scenes, and more. Our AI supports over 150 different artistic styles and can handle complex, detailed prompts.',
      q3: 'Is there a limit to how many images I can create?',
      a3: 'Free users can generate up to 10 images per day. Premium subscribers get unlimited generations, priority processing, and access to advanced features like higher resolutions and exclusive art styles.',
      q4: 'What resolution are the generated images?',
      a4: 'Free users receive images at 1024x1024 pixels. Premium users can generate images up to 4K resolution (4096x4096 pixels), perfect for printing and professional use.',
      q5: 'Can I use the generated images commercially?',
      a5: 'Yes! All images generated with Nano Banana can be used for commercial purposes. You retain full rights to your creations, including the ability to sell, modify, and distribute them as you wish.',
      q6: 'How long does it take to generate an image?',
      a6: 'Most images are generated within 15-30 seconds. Premium users enjoy priority processing, which can reduce generation time to as little as 10 seconds during peak hours.',
      q7: 'What makes Nano Banana different from other AI generators?',
      a7: 'Nano Banana focuses on quality, speed, and user experience. We use the latest AI models, offer more artistic styles than competitors, provide better prompt understanding, and maintain the highest image quality standards in the industry.',
      q8: 'Is my data safe and private?',
      a8: 'Absolutely. We take privacy seriously. Your prompts and generated images are encrypted and never shared with third parties. You can delete your account and all associated data at any time.',
    },
    footer: {
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
      description: 'Transform your imagination into stunning artwork with Nano Banana\'s cutting-edge AI technology. Create, share, and discover amazing images from simple text prompts with Nano Banana.',
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
      title: 'Gallery of Creations',
      subtitle: 'Explore stunning artworks created by our community using Nano Banana\'s AI technology. Get inspired and create your own masterpieces with Nano Banana',
      loadMore: 'Load More Works',
      prompt: 'Prompt:',
      image1: {
        title: 'Mystical Forest',
        desc: 'A magical forest with glowing mushrooms and ethereal light',
      },
      image2: {
        title: 'Futuristic Cityscape',
        desc: 'A cyberpunk city with neon lights and flying cars',
      },
      image3: {
        title: 'Ocean Sunset',
        desc: 'A serene ocean scene with vibrant sunset colors',
      },
      image4: {
        title: 'Mountain Landscape',
        desc: 'Majestic mountains with dramatic clouds and lighting',
      },
      image5: {
        title: 'Space Galaxy',
        desc: 'A stunning view of distant galaxies and nebulae',
      },
      image6: {
        title: 'Abstract Art',
        desc: 'Vibrant abstract composition with flowing colors',
      },
      image7: {
        title: 'Wildlife Portrait',
        desc: 'A detailed portrait of a majestic wildlife creature',
      },
      image8: {
        title: 'Architectural Wonder',
        desc: 'Modern architecture with unique geometric patterns',
      },
      image9: {
        title: 'Vintage Car',
        desc: 'Classic vintage car in a nostalgic setting',
      },
      prompt1: 'magical forest with glowing mushrooms, ethereal lighting, fantasy art',
      prompt2: 'cyberpunk city, neon lights, flying cars, futuristic architecture',
      prompt3: 'ocean sunset, vibrant colors, peaceful waves, golden hour',
      prompt4: 'majestic mountains, dramatic clouds, epic landscape photography',
      prompt5: 'distant galaxies, colorful nebulae, space photography, stars',
      prompt6: 'abstract art, vibrant colors, flowing patterns, digital painting',
      prompt7: 'wildlife portrait, detailed fur, natural habitat, professional photography',
      prompt8: 'modern architecture, geometric patterns, glass and steel, urban design',
      prompt9: 'vintage car, classic design, nostalgic atmosphere, retro photography',
    },
    draw: {
      prompt: 'Generated from prompt:',
      heroExamplePrompt: 'Scene of several ducks swimming in the water',
      title: 'AI Image Generator',
      subtitle: 'Transform your ideas into stunning artwork with our advanced AI technology',
      promptPlaceholder: 'Describe what you want to see...',
      styleLabel: 'Art Style',
      sizeLabel: 'Image Size',
      generateButton: 'Generate Image',
      generating: 'Generating...',
      downloadButton: 'Download',
      favoriteButton: 'Favorite',
      regenerateButton: 'Regenerate',
      successMessage: 'Image generated successfully!',
      errorMessage: 'Generation failed, please try again',
      waitingForGeneration: 'Waiting for generation',
      success: 'Success',
      describeYourIdea: 'Describe Your Idea',
      describeYourIdeaDesc: 'Describe in detail what kind of image you want to generate',
      result: 'Generation Result',
      enterPromptAndClick: 'Enter a prompt and click the generate button',
      styleRealistic: '🎭 Realistic Style - Photorealistic effect',
      styleAnime: '🎌 Anime Style - Japanese anime style',
      styleOilPainting: '🖼️ Oil Painting Style - Classical oil painting art',
      styleWatercolor: '💧 Watercolor Style - Soft watercolor painting',
      styleSketch: '✏️ Sketch Style - Black and white sketch art',
      sizeSquare: '⬜ Square',
      sizePortrait: '📱 Portrait',
      sizeLandscape: '🖥️ Landscape',
      sizeWidescreen: '🎬 Widescreen',
      sizeMobilePortrait: '📱 Mobile Portrait',
      tip: 'Tip: The more detailed your description, the more the generated image will match your imagination',
      costCredits: 'Costs {credits} credits',
      loginRequired: 'Please Login First',
      loginRequiredDesc: 'You need to login to use the AI image generation feature',
      cancel: 'Cancel',
      goToLogin: 'Go to Login',
      generatedImage: 'Generated Image',
      generationFailed: 'Generation failed',
      insufficientCredits: 'Insufficient credits, please recharge first',
      creditConsumeError: 'Failed to consume credits, please try again',
    },
    about: {
      badge: 'About Nano Banana',
      title: 'Revolutionizing AI Art Creation',
      subtitle: 'Nano Banana is at the forefront of AI-powered creativity, empowering artists, designers, and creators to bring their wildest imaginations to life through cutting-edge artificial intelligence technology.',
      mission: {
        title: 'Our Mission',
        desc: 'To democratize art creation by making professional-grade AI image generation accessible to everyone. We believe that creativity should have no boundaries, and technology should amplify human imagination, not replace it.',
      },
      vision: {
        title: 'Our Vision',
        desc: 'A world where anyone can create stunning artwork in seconds, where ideas flow freely from mind to canvas, and where AI serves as the ultimate creative companion for human expression and innovation.',
      },
      feature1: {
        title: 'Advanced AI Technology',
        desc: 'Powered by state-of-the-art machine learning models, delivering high-quality, creative, and unique artwork generation.',
      },
      feature2: {
        title: 'User-Centric Design',
        desc: 'Intuitive interface designed for creators of all skill levels, from beginners to professional artists and designers.',
      },
      feature3: {
        title: 'Privacy & Security',
        desc: 'Enterprise-grade security measures to protect your creative work and ensure your intellectual property remains safe.',
      },
      stats: {
        images: 'Images Created',
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
      subtitle: 'Flexible credit-based pricing, only 10 credits per generation',
      creditInfo: 'Each AI generation costs 10 credits',
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
          '50 AI Generations',
          'Basic Image Quality',
          'Standard Support',
          '7-Day Refund'
        ],
        advanced: [
          '1000 Credits',
          '100 AI Generations',
          'HD Image Quality',
          'Priority Support',
          '30-Day Refund',
          'Exclusive Templates'
        ],
        professional: [
          '3000 Credits',
          '300 AI Generations',
          'Ultra HD Quality',
          '24/7 Dedicated Support',
          '90-Day Refund',
          'Exclusive Templates',
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
      startCreating: 'Start AI Creation',
      contactSupport: 'Contact Support'
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
      aiGenerations: 'AI Generations',
      usedThisMonth: 'Used This Month',
      collectedWorks: 'Collected Works',
      collectedWorksDesc: 'Collected works',
      membershipLevel: 'Membership Level',
      advancedUser: 'Advanced User',
      premiumUser: 'Premium User',
      creditsOverview: 'Credits Overview',
      availableCredits: 'Available Credits',
      creditsDescription: 'Credits for AI image generation',
      remainingGenerations: 'Remaining Generations',
      creditsValue: 'Credits Value',
      buyMoreCredits: 'Buy More Credits',
      aiGenerationHistory: 'AI Generation History',
      imageGeneration: 'Image Generation',
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
    }
  },
  zh: {
    nav: {
      home: '首页',
      pricing: '定价',
      gallery: '画廊',
      about: '关于我们',
      getStarted: '开始使用',
      aiGenerator: 'AI生成器'
    },
    hero: {
      title: '将你的想法转化为惊艳的艺术品',
      subtitle: '使用我们先进的AI图像生成技术，在几秒钟内创作出美丽、独特的艺术作品',
      cta: '立即开始创作',
      learnMore: '了解更多',
      examplePrompt: '几只鸭子在水中游泳',
    },
    what: {
      title: '什么是Nano Banana？',
      subtitle: '一个AI驱动的平台，将你的文字描述转化为惊艳的视觉艺术作品',
      feature1: {
        title: 'AI驱动生成',
        desc: '先进的人工智能在几秒钟内将你的文字描述转化为惊艳、独特的艺术作品',
      },
      feature2: {
        title: '多种艺术风格',
        desc: '选择写实、卡通、油画、水彩画等数十种艺术风格',
      },
      feature3: {
        title: '高质量输出',
        desc: '生成高达4K质量的高分辨率图像，完美适用于打印和专业用途',
      },
      feature4: {
        title: '极速生成',
        desc: '在30秒内获得你的定制艺术作品。无需等待，无延迟 - 即时创作',
      },
    },
    why: {
      title: '为什么选择Nano Banana？',
      subtitle: '体验数字艺术创作的未来',
      reason1: {
        title: '隐私与安全',
        desc: '你的提示词和生成的图像完全私密。我们绝不会在未经许可的情况下存储或分享你的创意内容',
      },
      reason2: {
        title: '创作者信赖',
        desc: '加入超过50万名艺术家、设计师和创作者，他们都依赖Nano Banana进行创意项目',
      },
      reason3: {
        title: '行业领先',
        desc: '我们的AI模型采用最新技术训练，相比其他平台提供卓越质量',
      },
      reason4: {
        title: '持续改进',
        desc: '我们根据用户反馈和技术进步定期更新AI模型并添加新功能',
      },
      stats: {
        uptime: '运行时间保证',
        support: '客户支持',
        images: '已生成图像',
        styles: '艺术风格',
      },
    },
    how: {
      title: '如何使用',
      subtitle: '创作杰作的三个简单步骤',
      step1: {
        title: '输入你的提示词',
        desc: '用简单的词汇描述你的愿景。尽可能创意和详细',
      },
      step2: {
        title: '选择你的风格',
        desc: '选择各种艺术风格，如写实、卡通、油画等',
      },
      step3: {
        title: '下载你的艺术',
        desc: '获得令人惊艳的AI生成艺术作品，高分辨率，随时可用',
      },
    },
    stats: {
      images: '已创建图像',
      users: '活跃用户',
      uptime: '运行时间',
      support: '支持服务',
    },
    testimonials: {
      title: '用户评价',
      subtitle: '加入数千名满意的创作者，他们已经使用Nano Banana将想法转化为惊艳的艺术作品。以下是他们对Nano Banana体验的评价',
      user1: {
        name: '陈莎拉',
        role: '数字艺术家',
        text: 'Nano Banana彻底改变了我的创意工作流程。AI生成图像的质量绝对令人惊艳，可用的风格种类令人难以置信。我每天都在客户项目中使用它。',
      },
      user2: {
        name: '马库斯·罗德里格斯',
        role: '营销总监',
        text: '作为营销专业人士，我需要快速获得高质量视觉内容。Nano Banana正是如此。速度和质量无与伦比，为我们团队节省了无数时间和预算。',
      },
      user3: {
        name: '艾米丽·沃森',
        role: '内容创作者',
        text: '起初我对AI艺术持怀疑态度，但Nano Banana完全改变了我的想法。图像如此详细和创意 - 有时甚至比我想象的更好。就像拥有一个个人艺术家。',
      },
      user4: {
        name: '金大卫',
        role: '游戏开发者',
        text: '对于概念艺术和游戏资源，Nano Banana是一个游戏改变者。多样的风格和快速迭代的能力显著加速了我们的开发过程。强烈推荐！',
      },
      user5: {
        name: '丽莎·汤普森',
        role: '小企业主',
        text: '经营小企业，我需要价格实惠但专业的营销视觉内容。Nano Banana正是如此。质量可以与昂贵的库存照片相媲美，但具有完全的定制性。',
      },
      user6: {
        name: '亚历克斯·约翰逊',
        role: '自由设计师',
        text: 'Nano Banana的创意可能性是无限的。我可以探索需要手动创建数小时的想法和概念。它已成为我设计工具库中的重要工具。',
      },
      stats: {
        averageRating: '平均评分',
        happyUsers: '满意用户',
        imagesGenerated: '已生成图像',
        satisfactionRate: '满意度',
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于Nano Banana你需要知道的一切',
      contact: '还有问题？我们随时为你提供帮助！',
      contactButton: '联系支持',
      q1: 'Nano Banana是如何工作的？',
      a1: 'Nano Banana使用先进的AI模型来解读你的文字描述并生成相应的图像。只需输入你想要看到的内容，选择你喜欢的风格，我们的AI就会在几秒钟内创建独特的艺术作品。',
      q2: '我可以生成什么类型的图像？',
      a2: '你可以生成几乎任何类型的图像 - 从写实照片到抽象艺术、卡通、风景、肖像、奇幻场景等等。我们的AI支持150多种不同的艺术风格，可以处理复杂、详细的提示词。',
      q3: '我可以创建的图像数量有限制吗？',
      a3: '免费用户每天最多可以生成10张图像。高级订阅用户可以获得无限生成、优先处理和访问高级功能的权限，如更高分辨率和独家艺术风格。',
      q4: '生成的图像分辨率是多少？',
      a4: '免费用户获得1024x1024像素的图像。高级用户可以生成高达4K分辨率（4096x4096像素）的图像，完美适用于打印和专业用途。',
      q5: '我可以商业使用生成的图像吗？',
      a5: '是的！所有使用Nano Banana生成的图像都可以用于商业目的。你拥有创作的完全权利，包括销售、修改和分发它们的权利。',
      q6: '生成图像需要多长时间？',
      a6: '大多数图像在15-30秒内生成。高级用户享受优先处理，在高峰时段可以将生成时间缩短到仅10秒。',
      q7: 'Nano Banana与其他AI生成器有什么不同？',
      a7: 'Nano Banana专注于质量、速度和用户体验。我们使用最新的AI模型，提供比竞争对手更多的艺术风格，提供更好的提示词理解，并保持行业最高的图像质量标准。',
      q8: '我的数据安全私密吗？',
      a8: '绝对安全。我们认真对待隐私。你的提示词和生成的图像都经过加密，绝不会与第三方共享。你可以随时删除你的账户和所有相关数据。',
    },
    footer: {
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
      description: '使用Nano Banana的尖端AI技术，将你的想象力转化为惊艳的艺术作品。通过简单的文字提示，创作、分享和发现令人惊叹的图像。',
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
      title: '创作画廊',
      subtitle: '探索我们社区使用Nano Banana AI技术创作的惊艳艺术作品。获得灵感并创作你自己的杰作',
      loadMore: '加载更多作品',
      prompt: '提示词：',
      image1: {
        title: '神秘森林',
        desc: '一个充满发光蘑菇和空灵光芒的魔法森林',
      },
      image2: {
        title: '未来城市景观',
        desc: '一个拥有霓虹灯和飞行汽车的赛博朋克城市',
      },
      image3: {
        title: '海上日落',
        desc: '一个充满活力日落色彩的宁静海洋场景',
      },
      image4: {
        title: '山景',
        desc: '拥有戏剧性云彩和光线的雄伟山脉',
      },
      image5: {
        title: '太空银河',
        desc: '远处星系和星云的惊艳景观',
      },
      image6: {
        title: '抽象艺术',
        desc: '充满流动色彩的 vibrant 抽象构图',
      },
      image7: {
        title: '野生动物肖像',
        desc: '一个雄伟野生动物的详细肖像',
      },
      image8: {
        title: '建筑奇迹',
        desc: '拥有独特几何图案的现代建筑',
      },
      image9: {
        title: '复古汽车',
        desc: '怀旧环境中的经典复古汽车',
      },
      prompt1: '魔法森林，发光蘑菇，空灵光线，奇幻艺术',
      prompt2: '赛博朋克城市，霓虹灯，飞行汽车，未来建筑',
      prompt3: '海上日落，活力色彩，平静波浪，黄金时刻',
      prompt4: '雄伟山脉，戏剧性云彩，史诗风景摄影',
      prompt5: '远处星系，彩色星云，太空摄影，星星',
      prompt6: '抽象艺术，活力色彩，流动图案，数字绘画',
      prompt7: '野生动物肖像，详细毛发，自然栖息地，专业摄影',
      prompt8: '现代建筑，几何图案，玻璃和钢铁，城市设计',
      prompt9: '复古汽车，经典设计，怀旧氛围，复古摄影',
    },
    draw: {
      prompt: '生成自提示词：',
      heroExamplePrompt: '几只鸭子在水中游泳的场景',
      title: 'AI图像生成器',
      subtitle: '使用我们先进的AI技术，将你的想法转化为惊艳的艺术作品',
      promptPlaceholder: '描述你想要生成的图片...',
      styleLabel: '艺术风格',
      sizeLabel: '图像尺寸',
      generateButton: '生成图像',
      generating: '生成中...',
      downloadButton: '下载',
      favoriteButton: '收藏',
      regenerateButton: '重新生成',
      successMessage: '图像生成成功！',
      errorMessage: '生成失败，请重试',
      waitingForGeneration: '等待生成',
      success: '成功',
      describeYourIdea: '描述你的创意',
      describeYourIdeaDesc: '详细描述你想要生成的图片内容',
      result: '生成结果',
      enterPromptAndClick: '输入提示词并点击生成按钮',
      styleRealistic: '🎭 写实风格 - 逼真的照片效果',
      styleAnime: '🎌 动漫风格 - 日式动漫风格',
      styleOilPainting: '🖼️ 油画风格 - 古典油画艺术',
      styleWatercolor: '💧 水彩风格 - 柔和的水彩画',
      styleSketch: '✏️ 素描风格 - 黑白素描艺术',
      sizeSquare: '⬜ 正方形',
      sizePortrait: '📱 竖版',
      sizeLandscape: '🖥️ 横版',
      sizeWidescreen: '🎬 宽屏',
      sizeMobilePortrait: '📱 手机竖版',
      tip: '提示：描述越详细，生成的图片越符合你的想象',
      costCredits: '消耗 {credits} 积分',
      loginRequired: '请先登录',
      loginRequiredDesc: '登录后才能使用AI图片生成功能',
      cancel: '取消',
      goToLogin: '去登录',
      generatedImage: '生成的图片',
      generationFailed: '生成失败',
      insufficientCredits: '积分不足，请先充值',
      creditConsumeError: '积分消耗失败，请重试',
    },
    about: {
      badge: '关于Nano Banana',
      title: '革新AI艺术创作',
      subtitle: 'Nano Banana处于AI驱动创意的前沿，赋能艺术家、设计师和创作者，通过尖端人工智能技术将最狂野的想象力变为现实。',
      mission: {
        title: '我们的使命',
        desc: '通过让专业级AI图像生成技术为每个人所用，实现艺术创作的民主化。我们相信创意应该没有界限，技术应该放大人类想象力，而不是取代它。',
      },
      vision: {
        title: '我们的愿景',
        desc: '一个任何人都能在几秒钟内创作惊艳艺术作品的世界，想法从脑海自由流向画布，AI成为人类表达和创新的终极创意伙伴。',
      },
      feature1: {
        title: '先进AI技术',
        desc: '由最先进的机器学习模型驱动，提供高质量、创意和独特的艺术作品生成。',
      },
      feature2: {
        title: '以用户为中心的设计',
        desc: '为所有技能水平的创作者设计的直观界面，从初学者到专业艺术家和设计师。',
      },
      feature3: {
        title: '隐私与安全',
        desc: '企业级安全措施，保护您的创意作品，确保您的知识产权安全。',
      },
      stats: {
        images: '已创建图像',
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
      subtitle: '基于积分的灵活定价，每次生成仅需10积分',
      creditInfo: '每次AI生成消耗 10 积分',
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
          '50 次AI生成',
          '基础图片质量',
          '标准客服支持',
          '7天退款保证'
        ],
        advanced: [
          '1000 积分',
          '100 次AI生成',
          '高清图片质量',
          '优先客服支持',
          '30天退款保证',
          '专属生成模板'
        ],
        professional: [
          '3000 积分',
          '300 次AI生成',
          '超高清图片质量',
          '24/7 专属客服',
          '90天退款保证',
          '专属生成模板',
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
      startCreating: '开始AI创作',
      contactSupport: '联系客服'
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
      aiGenerations: 'AI生成次数',
      usedThisMonth: '本月已使用',
      collectedWorks: '收藏作品',
      collectedWorksDesc: '已收藏作品',
      membershipLevel: '会员等级',
      advancedUser: '高级用户',
      premiumUser: '高级用户',
      creditsOverview: '积分概览',
      availableCredits: '可用积分',
      creditsDescription: '用于AI图片生成的积分',
      remainingGenerations: '剩余生成次数',
      creditsValue: '积分价值',
      buyMoreCredits: '购买更多积分',
      aiGenerationHistory: 'AI生成记录',
      imageGeneration: '图片生成',
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
