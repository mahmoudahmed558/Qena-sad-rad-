import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, ArrowRight, ShieldCheck, CheckCheck, MapPin, Star, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'student' | 'owner';
  time: string;
  status: 'sending' | 'sent' | 'read';
  type?: 'text' | 'image';
  imageUrl?: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, text: 'السلام عليكم، هل الشقة ما زالت متوفرة؟', sender: 'student', time: '10:30 ص', status: 'read' },
  { id: 2, text: 'وعليكم السلام، نعم متوفرة. متى ترغب بالانتقال؟', sender: 'owner', time: '10:35 ص', status: 'read' },
  { id: 3, text: 'بداية الشهر القادم إن شاء الله، هل يمكنني زيارة المكان اليوم؟', sender: 'student', time: '10:38 ص', status: 'read' },
  { id: 4, text: 'بالتأكيد، أنا متواجد من الساعة 4 عصراً وحتى 8 مساءً.', sender: 'owner', time: '10:45 ص', status: 'read' },
  { id: 5, text: 'ممتاز، سأمر عليكم الساعة 5 عصراً. شكراً لك!', sender: 'student', time: '10:50 ص', status: 'read' },
];

const CONVERSATIONS = [
  {
    id: 1,
    name: 'أحمد عبدالله',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    lastMessage: 'ممتاز، سأمر عليكم الساعة 5 عصراً.',
    time: '10:50 ص',
    online: true,
    unread: 0,
    verified: true,
  },
  {
    id: 2,
    name: 'سارة محمد',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    lastMessage: 'هل يوجد موقف سيارات؟',
    time: 'أمس',
    online: false,
    unread: 2,
    verified: true,
  },
  {
    id: 3,
    name: 'خالد حسن',
    avatar: '',
    lastMessage: 'تم تأكيد الحجز، شكراً لك.',
    time: 'أمس',
    online: false,
    unread: 0,
    verified: false,
  },
];

export const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversation, setActiveConversation] = useState(CONVERSATIONS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim().length === 0) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'student',
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMessage.id ? { ...msg, status: 'sent' as const } : msg
      ));
    }, 500);

    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      const ownerReply: Message = {
        id: messages.length + 2,
        text: 'شكراً لك! سأكون بانتظارك.',
        sender: 'owner',
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };
      setMessages(prev => [...prev, ownerReply]);
    }, 3000);
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-73px)] max-w-7xl mx-auto w-full bg-[#f8fafc] overflow-hidden">

      {/* Conversations List (Sidebar in Chat) */}
      <div className="w-full md:w-80 bg-white border-l border-gray-200/60 flex-col hidden md:flex shrink-0 shadow-sm">
        <div className="p-5 border-b border-gray-200/60">
          <h2 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-4 flex items-center gap-2">
            المحادثات
          </h2>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في المحادثات..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#F2994A]/30 text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {CONVERSATIONS.map((conv) => (
            <motion.div
              key={conv.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveConversation(conv)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                activeConversation.id === conv.id
                  ? 'bg-gradient-to-l from-[#F2994A]/10 to-[#F2994A]/5 border border-[#F2994A]/20'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="relative">
                {conv.avatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white shadow-sm">
                    <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full shrink-0 bg-gradient-to-br from-[#003344] to-[#005566] flex items-center justify-center ring-2 ring-white shadow-sm">
                    <span className="font-['Cairo'] font-bold text-lg text-white">{conv.name.charAt(0)}</span>
                  </div>
                )}
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-['Cairo'] font-bold text-sm text-[#003344] truncate">{conv.name}</h3>
                    {conv.verified && <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${conv.unread > 0 ? 'text-[#F2994A] font-bold' : 'text-gray-400'}`}>
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-500 truncate flex-1">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="bg-[#F2994A] text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#f8fafc] to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 -translate-x-1/3 translate-y-1/3" />

        {/* Chat Header */}
        <div className="glass-panel px-6 py-4 border-b border-white/60 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link to="/results" className="md:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative">
                {activeConversation.avatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-white">
                    <img src={activeConversation.avatar} alt={activeConversation.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full shrink-0 bg-gradient-to-br from-[#003344] to-[#005566] flex items-center justify-center shadow-md ring-2 ring-white">
                    <span className="font-['Cairo'] font-bold text-xl text-white">{activeConversation.name.charAt(0)}</span>
                  </div>
                )}
                {activeConversation.online && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"
                  />
                )}
              </div>
              <div>
                <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] leading-tight flex items-center gap-1.5">
                  {activeConversation.name}
                  {activeConversation.verified && <ShieldCheck className="w-4 h-4 text-green-600" />}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  {activeConversation.online ? (
                    <>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span>متصل الآن</span>
                    </>
                  ) : (
                    <span>آخر ظهور: منذ ساعة</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-400 hover:text-[#003344] hover:bg-white/50 rounded-full transition-colors hidden sm:block"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-400 hover:text-[#003344] hover:bg-white/50 rounded-full transition-colors hidden sm:block"
            >
              <Video className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-400 hover:text-[#003344] hover:bg-white/50 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Date Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs text-gray-500 shadow-sm border border-white/80">
              اليوم
            </div>
          </div>

          {/* Linked Property Card in Chat */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-6"
          >
            <Link to="/property/1" className="block glass-panel rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border border-white/60 overflow-hidden group">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=150&auto=format&fit=crop"
                    alt="Property"
                    className="w-20 h-20 rounded-xl object-cover ring-2 ring-white shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-4 h-4 text-[#F2994A] fill-[#F2994A]" />
                    <span className="text-sm font-bold text-[#003344]">4.8</span>
                  </div>
                  <h4 className="font-['Cairo'] font-bold text-sm text-[#003344] line-clamp-1 mb-1">
                    سكن المدينة الجامعية - شقة زهرة النيل
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>حي الجامعة، الرياض</span>
                  </div>
                  <p className="text-base font-bold text-[#F2994A]">20,700 جنيه<span className="text-xs text-gray-500 font-normal"> / شهرياً</span></p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${msg.sender === 'student' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] md:max-w-[65%] flex flex-col ${msg.sender === 'student' ? 'items-start' : 'items-end'}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`
                      px-4 py-3 rounded-2xl text-sm shadow-md
                      ${msg.sender === 'student'
                        ? 'bg-gradient-to-br from-[#003344] to-[#004455] text-white rounded-tr-md'
                        : 'glass-panel text-[#003344] rounded-tl-md border border-white/60'}
                    `}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </motion.div>
                  <div className="flex items-center gap-1.5 mt-1.5 px-2">
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                    {msg.sender === 'student' && (
                      <CheckCheck
                        className={`w-3.5 h-3.5 ${
                          msg.status === 'read' ? 'text-[#F2994A]' :
                          msg.status === 'sent' ? 'text-gray-400' :
                          'text-gray-300'
                        }`}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex justify-end"
              >
                <div className="glass-panel px-4 py-3 rounded-2xl rounded-tl-md shadow-md border border-white/60">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-[#003344] rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-[#003344] rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-[#003344] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="glass-panel p-4 border-t border-white/60 sticky bottom-0 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-gray-400 hover:text-[#F2994A] hover:bg-white/50 rounded-xl transition-colors shrink-0 mb-1"
              >
                <Paperclip className="w-5 h-5" />
              </motion.button>

              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="اكتب رسالتك هنا..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-transparent focus:border-[#F2994A]/30 focus:outline-none rounded-2xl px-5 py-3.5 text-sm shadow-sm transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                {message.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
                  >
                    {message.length}
                  </motion.div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: message.trim().length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: message.trim().length > 0 ? 0.95 : 1 }}
                onClick={handleSendMessage}
                disabled={message.trim().length === 0}
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all shadow-md mb-1 ${
                  message.trim().length > 0
                    ? 'gradient-btn cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5 ml-0.5" />
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 mt-3 px-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-xs text-gray-500 hover:text-[#003344] bg-white/60 hover:bg-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                إرفاق صورة
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-xs text-gray-500 hover:text-[#003344] bg-white/60 hover:bg-white px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                اقتراح موعد زيارة
              </motion.button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
