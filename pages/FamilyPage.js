export const FamilyPage = {
  render() {
    return `
      <div class="page-fade min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 pb-32 pt-24">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-4xl sm:text-5xl font-bold text-pink-600 text-center mb-6">
            To My Lovely Family 💕
          </h1>
          
          <p class="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
            Thank you for always being there for me. Your love and support mean everything! 💖
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${this.renderFamilyCard('Mom', 'Thank you for your endless love and care 🌹', 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif')}
            ${this.renderFamilyCard('Dad', 'Thank you for always being my hero 💪', 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif')}
            ${this.renderFamilyCard('Siblings', 'Thank you for the fun and laughter 😄', 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif')}
          </div>
        </div>
      </div>
    `;
  },

  renderFamilyCard(title, message, gifUrl) {
    return `
      <div class="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
        <img 
          src="${gifUrl}" 
          alt="${title}" 
          class="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h3 class="text-2xl font-bold text-pink-600 mb-2">${title}</h3>
        <p class="text-gray-600">${message}</p>
      </div>
    `;
  }
};
