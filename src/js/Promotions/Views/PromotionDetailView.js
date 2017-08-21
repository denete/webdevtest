var Promotions = Promotions || {};
Promotions.Views = Promotions.Views || {};
Promotions.Views.PromotionDetailView = (function() {
	'use strict';

	/**
	 * Constructor.
	 * @param {object} - The Promotion to render.
	 */
	var PromotionDetailView = function(promotion) {
		this._promotion = promotion;
		this._template = $('#promotion-detail-template').html();
		this._drawingScheduleItemTemplate = $('#promotion-detail-drawing-schedule-row-template').html();
		this._notFoundTemplate = $('#promotion-detail-promotion-not-found-template').html();
		this._ticketsEnteredRowTemplate = $('#promotion-detail-tickets-entered-row-template').html();
	};
	
	/**
	 * Renders a row for the Drawing Schedule table.
	 * @param {object} - The Drawing to render.
	 * @returns {$} - A jQuery selector containing the rendered row.
	 */
	function renderDrawingScheduleRow(drawing) {
		var $row = $(this._drawingScheduleItemTemplate);

		$row
			.find('.prize')
			.text(drawing['prize']);
			
		$row
			.find('.entry-deadline')
			.text(Utils.DateUtils.formatHumanReadableDate(drawing['entry_deadline']));
			
		$row
			.find('.drawing-date')
			.text(Utils.DateUtils.formatHumanReadableDate(drawing['drawing_date']));
			
		return $row;
	}
	
	/**
	 * Renders a row for the Tickets Entered table.
	 * @param {object} - The Entry to render.
	 * @returns {$} - A jQuery selector containing the rendered row.
	 */
	function renderTicketsEnteredRow(drawing) {
		var $row = $(this._ticketsEnteredRowTemplate);

		$row
			.find('.entry-number')
			.text(drawing['entry_number']);
			
		$row
			.find('.date')
			.text(Utils.DateUtils.formatHumanReadableDate(drawing['date']));
			
		return $row;
	}
	
	/**
	 * Renders the PromotionDetailView based on the supplied Promotion.
	 * @returns {$} - A jQuery selector containing the rendered PromotionView.
	 */
	PromotionDetailView.prototype.render = function() {
		if (!this._promotion) {
			return $(this._notFoundTemplate);
		}
		
		var $promotion = $(this._template);

		var $deadline = $promotion.find('.deadline');
		$deadline.text($deadline.text().replace('{{DEADLINE_DATE}}',
			Utils.DateUtils.formatHumanReadableDate(this._promotion['drawings'][0]['entry_deadline'])));

		$promotion
			.find('.banner img')
			.attr('src', this._promotion['promo_image_url']);

		$promotion
			.find('.summary')
			.text(this._promotion['summary']);

		$promotion
			.find('.entry-info')
			.text(this._promotion['entry_info']);

		var $ticketsEnteredHeader = $promotion.find('.tickets-entered-header');
		$ticketsEnteredHeader.text($ticketsEnteredHeader.text().replace('{{TOTAL_TICKETS_ENTERED}}', this._promotion['entries'].length));
		
		var $drawingScheduleTable = $promotion.find('.drawing-schedule-table');
		for (var i = 0; i < this._promotion['drawings'].length; i++) {
			$drawingScheduleTable.append(renderDrawingScheduleRow.apply(this, [this._promotion['drawings'][i]]));
		}
		
		var $ticketsEnteredTable = $promotion.find('.tickets-entered-table');
		for (var j = 0; j < this._promotion['entries'].length; j++) {
			$ticketsEnteredTable.append(renderTicketsEnteredRow.apply(this, [this._promotion['entries'][j]]));
		}

		return $promotion;
	};
	
	return PromotionDetailView;
}($));